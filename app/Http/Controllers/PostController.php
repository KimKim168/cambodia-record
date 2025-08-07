<?php

namespace App\Http\Controllers;

use App\Helpers\ImageHelper;
use App\Helpers\FileHelper;
use App\Models\Creator;
use App\Models\Link;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\PostImage;
use App\Models\Publisher;
use App\Models\PublishingCountry;
use App\Models\Type;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Routing\Controllers\HasMiddleware;
// Import your correct model name
use App\Models\PostUploadFile;


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
        $query->with('created_by', 'updated_by', 'images', 'category', 'creator', 'publisher', 'source_detail', 'publishing_country', 'upload_file');

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
        // return $tableData;
        return Inertia::render('admin/posts/Index', [
            'tableData' => $tableData,
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('admin/posts/Create', [
            'links' => Link::orderBy('title')->where('status', 'active')->get(),
            'postCategories' => PostCategory::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postCreators' => Creator::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postPublishers' => Publisher::where('status', 'active')->orderBy('id', 'desc')->get(),
            'publishingCountry' => PublishingCountry::where('status', 'active')->orderBy('id', 'desc')->get(),
            'types' => Type::where(['status' => 'active', 'type_of' => 'post'])->orderBy('id', 'desc')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'post_date' => 'required|date',
            'title_kh' => 'nullable|string|max:255',
            'short_description' => 'nullable|string|max:500',
            'short_description_kh' => 'nullable|string|max:500',
            'long_description' => 'nullable|string',
            'long_description_kh' => 'nullable|string',
            'link' => 'nullable|string|max:255',
            'source' => 'nullable|string|max:255',
            'category_code' => 'nullable|string',
            'publishing_countries_code' => 'nullable|string',
            'creator_id' => 'nullable|numeric',
            'publisher_id' => 'nullable|numeric',
            'type' => 'nullable|string',
            'subject' => 'nullable|string',
            'year' => 'nullable|string',
            'status' => 'nullable|string|in:active,inactive',
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
        return Inertia::render('admin/posts/Create', [
            'links' => Link::orderBy('title')->where('status', 'active')->get(),
            'editData' => $post->load('images', 'upload_file'),
            'postCategories' => PostCategory::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postCreators' => Creator::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postPublishers' => Publisher::where('status', 'active')->orderBy('id', 'desc')->get(),
            'publishingCountry' => PublishingCountry::where('status', 'active')->orderBy('id', 'desc')->get(),
            'types' => Type::where(['status' => 'active', 'type_of' => 'post'])->orderBy('id', 'desc')->get(),
            'readOnly' => true,
        ]);
    }

    public function edit(Post $post)
    {
        return Inertia::render('admin/posts/Create', [
            'links' => Link::orderBy('title')->where('status', 'active')->get(),
            'editData' => $post->load('images', 'upload_file'),
            'postCategories' => PostCategory::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postCreators' => Creator::where('status', 'active')->orderBy('id', 'desc')->get(),
            'postPublishers' => Publisher::where('status', 'active')->orderBy('id', 'desc')->get(),
            'publishingCountry' => PublishingCountry::where('status', 'active')->orderBy('id', 'desc')->get(),
            'types' => Type::where(['status' => 'active', 'type_of' => 'post'])->orderBy('id', 'desc')->get(),
        ]);
    }


    public function update(Request $request, Post $post)
    {

        // dd($request->all());
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'post_date' => 'nullable|date',
            'title_kh' => 'nullable|string|max:255',
            'short_description' => 'nullable|string|max:500',
            'short_description_kh' => 'nullable|string|max:500',
            'long_description' => 'nullable|string',
            'long_description_kh' => 'nullable|string',
            'link' => 'nullable|string|max:255',
            'source' => 'nullable|string|max:255',
            'category_code' => 'nullable|string',
            'publishing_countries_code' => 'nullable|string',
            'creator_id' => 'nullable|numeric',
            'publisher_id' => 'nullable|numeric',
            'type' => 'nullable|string',
            'subject' => 'nullable|string',
            'year' => 'nullable|string',
            'status' => 'nullable|string|in:active,inactive',
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
        }  catch (\Exception $e) {
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
