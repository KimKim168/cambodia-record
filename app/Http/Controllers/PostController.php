<?php

namespace App\Http\Controllers;

use App\Helpers\ImageHelper;
use App\Helpers\FileHelper;
use App\Models\Creator;
use App\Models\Discourse;
use App\Models\Link;
use App\Models\Location;
use App\Models\People;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\PostCreatorLink;
use App\Models\PostImage;
use App\Models\PostLocationLink;
use App\Models\PostPeopleLink;
use App\Models\PostTopicLink;
use App\Models\PostTypeLink;
use App\Models\Publisher;
use App\Models\PublishingCountry;
use App\Models\Type;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;
use App\Models\PostUploadFile;
use App\Models\Subject;
use App\Models\Topic;

class PostController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:post view', only: ['index', 'show']),
            new Middleware('permission:post create', only: ['create', 'store']),
            new Middleware('permission:post update', only: ['edit', 'update', 'update_status']),
            new Middleware('permission:post delete', only: ['destroy', 'destroy_image', 'destroy_upload_file']),
        ];
    }

    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $status = $request->input('status');

        $query = Post::query();

        // Eager load your correct relationship name 'upload_file'
        $query->with('created_by', 'updated_by', 'images', 'category', 'creator', 'subject', 'publisher', 'location', 'people', 'topic', 'source_detail', 'publishing_country', 'upload_file');

        if ($status) {
            $query->where('status', $status);
        }
        $query->orderBy($sortBy, $sortDirection);

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                return $sub_query->where('title', 'LIKE', "%{$search}%")
                    ->orWhere('title_kh', 'LIKE', "%{$search}%");
            });
        }

        $tableData = $query->paginate(perPage: 10)->onEachSide(1);

        $People = People::where(['status' => 'active'])->orderBy('id', 'desc')->get();
        // return $tableData;
        return Inertia::render('admin/posts/Index', [
            'tableData' => $tableData,
        ]);
    }

    public function create(Request $request)
    {
        $types = Type::where(['status' => 'active', 'type_of' => 'post'])->orderBy('id', 'desc')->get();
        // return ($types->all());
        return Inertia::render('admin/posts/Create', [
            'links' => Link::orderBy('title')->where('status', 'active')->get(),
            'postCategories' => PostCategory::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postCreators' => Creator::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postLocations' => Location::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postDiscourses' => Discourse::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postTopics' => Topic::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postPeople' => People::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postSubjects' => Subject::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postPublishers' => Publisher::where('status', 'active')->orderBy('id', 'desc')->get(),
            'publishingCountry' => PublishingCountry::where('status', 'active')->orderBy('id', 'desc')->get(),
            'types' => $types,
            'typePeople' => Type::where(['status' => 'active', 'type_of' => 'people'])->orderBy('id', 'desc')->get(),
            'people' => People::where(['status' => 'active'])->orderBy('id', 'desc')->get(),
        ]);
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'post_date' => 'required|date',
            'publishing_date' => 'required|date',
            'title_kh' => 'nullable|string|max:255',
            'short_description' => 'nullable|string|max:500',
            'short_description_kh' => 'nullable|string|max:500',
            'long_description' => 'nullable|string',
            'long_description_kh' => 'nullable|string',
            'link' => 'nullable|string|max:255',
            'web_link' => 'nullable|string|max:255',
            'source' => 'nullable|string|max:255',
            'category_code' => 'nullable|string',
            'publishing_countries_code' => 'nullable|string',
            'creator_id' => 'nullable|numeric',
            'publisher_id' => 'nullable|numeric',
            'topic_id' => 'nullable|numeric',
            'location_id' => 'nullable|numeric',
            'subject_id' => 'nullable|numeric',
            'discourse_id' => 'nullable|numeric',
            'type' => 'nullable|string',
            'people_id' => 'nullable|numeric',
            'year' => 'nullable|string',
            'status' => 'nullable|string|in:active,inactive',
            'file_status' => 'nullable|string|in:public,private',
            'verify_status' => 'nullable|string|in:unverify,verify',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp,svg,webp|max:2048',
            'files' => 'nullable|array',
            'files.*' => 'file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,jpg,jpeg,mp3,mp4,mov|max:20480',
        ]);

        $postData = $validated;
        unset($postData['images'], $postData['files']);

        $postData['created_by'] = $request->user()->id;
        $postData['updated_by'] = $request->user()->id;
        $postData['post_date'] = Carbon::parse($validated['post_date'])->setTimezone('Asia/Bangkok')->startOfDay()->toDateString();
        $postData['publishing_date'] = Carbon::parse($validated['publishing_date'])->setTimezone('Asia/Bangkok')->startOfDay()->toDateString();

        foreach ($postData as $key => $value) {
            if ($value === '') {
                $postData[$key] = null;
            }
        }

        try {
            DB::transaction(function () use ($request, $postData) {
                $created_post = Post::create($postData);

                if ($request->hasFile('images')) {
                    foreach ($request->file('images') as $image) {
                        $created_image_name = ImageHelper::uploadAndResizeImageWebp($image, 'assets/images/posts', 600);
                        PostImage::create([
                            'image' => $created_image_name,
                            'post_id' => $created_post->id,
                        ]);
                    }
                }

                // Save topics
                $selectedTopics = $request->selected_topics ?? [];
                if (count($selectedTopics) > 0) {
                    foreach ($selectedTopics as $key => $topic) {
                        PostTopicLink::create([
                            'post_id' => $created_post->id,
                            'topic_id' => $topic['value'],
                        ]);
                    }
                }
                // End Save topics

                // --------------------------------------

                // Save Location
                $selectedLocations = $request->selected_locations ?? [];
                if (count($selectedLocations) > 0) {
                    foreach ($selectedLocations as $key => $location) {
                        PostLocationLink::create([
                            'post_id' => $created_post->id,
                            'location_id' => $location['value'],
                        ]);
                    }
                }
                // End Save Location

                // --------------------------------------

                // Save People
                $selectedPeople = $request->selected_people ?? [];
                if (count($selectedPeople) > 0) {
                    foreach ($selectedPeople as $key => $people) {
                        PostPeopleLink::create([
                            'post_id' => $created_post->id,
                            'person_id' => $people['value'],
                        ]);
                    }
                }
                // End Save People

                // --------------------------------------

                // Save Creators
                $selectedCreators = $request->selected_creators ?? [];
                if (count($selectedCreators) > 0) {
                    foreach ($selectedCreators as $key => $creators) {
                        PostCreatorLink::create([
                            'post_id' => $created_post->id,
                            'creator_id' => $creators['value'],
                        ]);
                    }
                }
                // End Save Creators

                // --------------------------------------

                // Save Types
                $selectedTypes = $request->selected_types ?? [];
                if (count($selectedTypes) > 0) {
                    foreach ($selectedTypes as $key => $types) {
                        PostTypeLink::create([
                            'post_id' => $created_post->id,
                            'type_id' => $types['value'],
                        ]);
                    }
                }
                // End Save Types

                if ($request->hasFile('files')) {
                    foreach ($request->file('files') as $attachmentFile) {
                        $created_file_name  = FileHelper::uploadFile($attachmentFile, 'assets/files/videos', true);

                        PostUploadFile::create([
                            'post_id' => $created_post->id,
                            'file_name' => $created_file_name
                        ]);
                    }
                }
            });
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to create post: ' . $e->getMessage())->withInput();
        }

        return redirect()->back()->with('success', 'Post Created Successfully!');
    }

    public function show(Post $post)
    {
        $editData = $post->load('images', 'upload_file', 'topics', 'locations', 'peoples', 'creators');

        return Inertia::render('admin/posts/Create', [
            'links' => Link::orderBy('title')->where('status', 'active')->get(),
            'editData' => $editData,
            'postCategories' => PostCategory::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postCreators' => Creator::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postPublishers' => Publisher::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postDiscourses' => Discourse::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postLocations' => Location::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postTopics' => Topic::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postPeople' => People::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postSubjects' => Subject::where('status', 'active')->orderBy('id', 'desc')->get(),
            'publishingCountry' => PublishingCountry::where('status', 'active')->orderBy('id', 'desc')->get(),
            'types' => Type::where(['status' => 'active', 'type_of' => 'post'])->orderBy('id', 'desc')->get(),
            'typePeople' => Type::where(['status' => 'active', 'type_of' => 'people'])->orderBy('id', 'desc')->get(),
            'people' => People::where(['status' => 'active'])->orderBy('id', 'desc')->get(),
            'readOnly' => true,
        ]);
    }

    public function edit(Post $post)
    {
        $editData = $post->load('images', 'upload_file', 'topics', 'locations', 'peoples','creators','types');
        // dd($editData);
        return Inertia::render('admin/posts/Create', [
            'links' => Link::orderBy('title')->where('status', 'active')->get(),
            'editData' => $editData,
            'postCategories' => PostCategory::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postCreators' => Creator::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postPublishers' => Publisher::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postDiscourses' => Discourse::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postLocations' => Location::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postTopics' => Topic::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postPeople' => People::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postSubjects' => Subject::where('status', 'active')->orderBy('id', 'desc')->get(),
            'publishingCountry' => PublishingCountry::where('status', 'active')->orderBy('id', 'desc')->get(),
            'types' => Type::where(['status' => 'active', 'type_of' => 'post'])->orderBy('id', 'desc')->get(),
            'typePeople' => Type::where(['status' => 'active', 'type_of' => 'people'])->orderBy('id', 'desc')->get(),
            'people' => People::where(['status' => 'active'])->orderBy('id', 'desc')->get(),
        ]);
    }


    public function update(Request $request, Post $post)
    {
        // dd($request->all());
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'post_date' => 'nullable|date',
            'publishing_date' => 'nullable|date',
            'title_kh' => 'nullable|string|max:255',
            'short_description' => 'nullable|string|max:500',
            'short_description_kh' => 'nullable|string|max:500',
            'long_description' => 'nullable|string',
            'long_description_kh' => 'nullable|string',
            'link' => 'nullable|string|max:255',
            'web_link' => 'nullable|string|max:255',
            'source' => 'nullable|string|max:255',
            'category_code' => 'nullable|string',
            'publishing_countries_code' => 'nullable|string',
            'creator_id' => 'nullable|numeric',
            'publisher_id' => 'nullable|numeric',
            'topic_id' => 'nullable|numeric',
            'location_id' => 'nullable|numeric',
            'subject_id' => 'nullable|numeric',
            'discourse_id' => 'nullable|numeric',
            'people_id' => 'nullable|numeric',
            'type' => 'nullable|string',
            'year' => 'nullable|string',
            'status' => 'nullable|string|in:active,inactive',
            'file_status' => 'nullable|string|in:private,public',
            'verify_status' => 'nullable|string|in:unverify,verify',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp,svg,webp|max:2048',
            'files' => 'nullable|array',
            'files.*' => 'file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,jpg,jpeg,mp3,mp4,mov|max:307200',
        ]);

        $postData = $validated;
        unset($postData['images'], $postData['files']);

        $postData['updated_by'] = $request->user()->id;
        if ($request->post_date) {
            $postData['post_date'] = Carbon::parse($validated['post_date'])->setTimezone('Asia/Bangkok')->startOfDay()->toDateString();
        }

        $postData['updated_by'] = $request->user()->id;
        if ($request->publishing_date) {
            $postData['publishing_date'] = Carbon::parse($validated['publishing_date'])->setTimezone('Asia/Bangkok')->startOfDay()->toDateString();
        }


        foreach ($postData as $key => $value) {
            if ($value === '') {
                $postData[$key] = null;
            }
        }

        try {
            DB::transaction(function () use ($request, $post, $postData) {
                // Update the main post details
                $post->update($postData);

                // Handle new image uploads
                if ($request->hasFile('images')) {
                    foreach ($request->file('images') as $image) {
                        $created_image_name = ImageHelper::uploadAndResizeImageWebp($image, 'assets/images/posts', 600);
                        PostImage::create([
                            'image' => $created_image_name,
                            'post_id' => $post->id,
                        ]);
                    }
                }

                // ---------------------------------------------------

                // Save topics
                $selectedTopics = $request->selected_topics ?? [];
                PostTopicLink::where('post_id', $post->id)->delete();
                if (count($selectedTopics) > 0) {
                    foreach ($selectedTopics as $key => $topic) {
                        PostTopicLink::create([
                            'post_id' => $post->id,
                            'topic_id' => $topic['value'],
                        ]);
                    }
                }
                // End Save topics

                // ---------------------------------------------------

                // Save Location
                $selectedLocations = $request->selected_locations ?? [];
                PostLocationLink::where('post_id', $post->id)->delete();
                if (count($selectedLocations) > 0) {
                    foreach ($selectedLocations as $key => $location) {
                        PostLocationLink::create([
                            'post_id' => $post->id,
                            'location_id' => $location['value'],
                        ]);
                    }
                }
                // End Save Location

                // ---------------------------------------------------

                // Save People
                $selectedPeople = $request->selected_people ?? [];
                PostPeopleLink::where('post_id', $post->id)->delete();
                if (count($selectedPeople) > 0) {
                    foreach ($selectedPeople as $key => $people) {
                        PostPeopleLink::create([
                            'post_id' => $post->id,
                            'person_id' => $people['value'],
                        ]);
                    }
                }
                // End Save People

                // ---------------------------------------------------

                // Save Creators
                $selectedCreators = $request->selected_creators ?? [];
                PostCreatorLink::where('post_id', $post->id)->delete();
                if (count($selectedCreators) > 0) {
                    foreach ($selectedCreators as $key => $creators) {
                        PostCreatorLink::create([
                            'post_id' => $post->id,
                            'creator_id' => $creators['value'],
                        ]);
                    }
                }
                // End Save Creators

                // --------------------------------------

                // Save Types
                $selectedTypes = $request->selected_types ?? [];
                PostTypeLink::where('post_id', $post->id)->delete();
                if (count($selectedTypes) > 0) {
                    foreach ($selectedTypes as $key => $types) {
                        PostTypeLink::create([
                            'post_id' => $post->id,
                            'type_id' => $types['value'],
                        ]);
                    }
                }
                // End Save Types

                // --------------------------------------

                // Handle new attachment file uploads
                if ($request->hasFile('files')) {
                    // First, delete old files to prevent orphans
                    // foreach ($post->upload_file as $oldFile) {
                    //     FileHelper::deleteFile($oldFile->file_name, 'assets/files/videos');
                    //     $oldFile->delete();
                    // }

                    // Now, upload and create new file records
                    foreach ($request->file('files') as $attachmentFile) {
                        $created_file_name  = FileHelper::uploadFile($attachmentFile, 'assets/files/videos', true);
                        PostUploadFile::create([
                            'post_id' => $post->id,
                            'file_name' => $created_file_name
                        ]);
                    }
                }
            });
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to create post: ' . $e->getMessage())->withInput();
        }
        // return $postData;
        return redirect()->back()->with('success', 'Post Created Successfully!');
    }

    // public function update(Request $request, Post $post)
    // {
    //     // dd($request->all());
    //     $validated = $request->validate([
    //         'title' => 'required|string|max:255',
    //         'post_date' => 'nullable',
    //         'title_kh' => 'nullable|string|max:255',
    //         'short_description' => 'nullable|string|max:500',
    //         'short_description_kh' => 'nullable|string|max:500',
    //         'long_description' => 'nullable|string',
    //         'long_description_kh' => 'nullable|string',
    //         'link' => 'nullable|string|max:255',
    //         'source' => 'nullable|string|max:255',
    //         'category_code' => 'nullable|string',
    //         'publishing_countries_code' => 'nullable|string',
    //         'creator_id' => 'nullable|numeric',
    //         'publisher_id' => 'nullable|numeric',
    //         'type' => 'nullable|string',
    //         'subject' => 'nullable|string',
    //         'year' => 'nullable|string',
    //         'status' => 'nullable|string|in:active,inactive',
    //         'images' => 'nullable|array',
    //         'images.*' => 'image|mimes:jpeg,png,jpg,gif,webp,svg,webp|max:2048',
    //         'files' => 'nullable|array',
    //         'files.*' => 'file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,jpg,jpeg,mp3,mp4,mov|max:20480',
    //     ]);

    //     $postData = $validated;
    //     // 💡 FIX: Unset files and images from the main post data
    //     unset($postData['images'], $postData['files']);

    //     $postData['updated_by'] = $request->user()->id;
    //     if($request->post_date){
    //         $postData['post_date'] = Carbon::parse($validated['post_date'])->setTimezone('Asia/Bangkok')->startOfDay()->toDateString();
    //     }

    //     foreach ($postData as $key => $value) {
    //         if ($value === '') {
    //             $postData[$key] = null;
    //         }
    //     }

    //     try {
    //         DB::transaction(function () use ($request, $post, $postData) {
    //             // Update the main post details
    //             $post->update($postData);

    //             // Handle new image uploads
    //             if ($request->hasFile('images')) {
    //                 foreach ($request->file('images') as $image) {
    //                     $created_image_name = ImageHelper::uploadAndResizeImageWebp($image, 'assets/images/posts', 600);
    //                     PostImage::create([
    //                         'image' => $created_image_name,
    //                         'post_id' => $post->id,
    //                     ]);
    //                 }
    //             }

    //             if ($request->hasFile('files')) {
    //                 // First, delete old files to prevent orphans
    //                 foreach ($post->upload_file as $oldFile) {
    //                     FileHelper::deleteFile($oldFile->file_name, 'assets/files/videos');
    //                     $oldFile->delete();
    //                 }

    //                 // Now, upload and create new file records
    //                 foreach ($request->file('files') as $attachmentFile) {
    //                     $created_file_name  = FileHelper::uploadFile($attachmentFile, 'assets/files/videos', true);
    //                     PostUploadFile::create([
    //                         'post_id' => $post->id,
    //                         'file_name' => $created_file_name
    //                     ]);
    //                 }
    //             }
    //         });
    //     } catch (\Exception $e) {
    //          return redirect()->back()->with('error', 'Failed to update post: ' . $e->getMessage());
    //     }

    //     return redirect()->route('admin.posts.Index')->with('success', 'Post Updated Successfully!');
    // }

    public function update_status(Request $request, Post $post)
    {
        $request->validate([
            'status' => 'required|string|in:active,inactive',
        ]);
        $post->update([
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Status updated successfully!');
    }

    public function update_verify_status(Request $request, Post $post)
    {
        $request->validate([
            'verify_status' => 'required|string|in:unverify,verify',
        ]);
        $post->update([
            'verify_status' => $request->verify_status,
        ]);

        return redirect()->back()->with('success', 'Verify status updated successfully!');
    }

    public function update_file_status(Request $request, Post $post)
    {
        // dd($request->all());
        $request->validate([
            'file_status' => 'required|string|in:public,private',
        ]);

        $post->update([
            'file_status' => $request->file_status,
        ]);

        return redirect()->back()->with('success', 'File status updated successfully!');
    }


    public function destroy(Post $post)
    {
        if (count($post->images) > 0) {
            foreach ($post->images as $image) {
                ImageHelper::deleteImage($image->image, 'assets/images/posts');
            }
        }
        // Also delete attachment files when deleting a post
        foreach ($post->upload_file as $file) {
            FileHelper::deleteFile($file->file_name, 'assets/files/videos');
            $file->delete();
        }
        $post->delete();
        return redirect()->back()->with('success', 'post deleted successfully.');
    }

    public function destroy_upload_file(PostUploadFile $file)
    {
        if (!$file) {
            return redirect()->back()->with('error', 'File not found.');
        }

        // Use FileHelper to delete the physical file from storage
        FileHelper::deleteFile($file->file_name, 'assets/files/videos');

        // Delete the record from the database
        $file->delete();

        return redirect()->back()->with('success', 'File deleted successfully.');
    }

    public function destroy_image(PostImage $image)
    {
        if (!$image) {
            return redirect()->back()->with('error', 'Image not found.');
        }

        ImageHelper::deleteImage($image->image, 'assets/images/posts');

        $image->delete();

        return redirect()->back()->with('success', 'Image deleted successfully.');
    }
}
