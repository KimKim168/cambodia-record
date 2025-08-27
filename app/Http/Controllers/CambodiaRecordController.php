<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Inertia\Inertia;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\Publisher;
use App\Models\Topic;
use App\Models\Type;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class CambodiaRecordController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 6);

        $categoriesByOrderIndex = PostCategory::where('status', 'active')->orderBy('order_index')->get();
        $categoriesById = PostCategory::where('status', 'active')->orderBy('id', 'desc')->get();
        $types = Type::where('status', 'active')->orderBy('id', 'desc')->get();
        $publishers = Publisher::where('status', 'active')->orderBy('id', 'desc')->get();
        $location = Location::where('status', 'active')->orderBy('id', 'desc')->get();
        $topic = Topic::where('status', 'active')->orderBy('id', 'desc')->get();
        $typePeople = Type::where('type_of', 'people')
            ->where('status', 'active')
            ->orderBy('id', 'desc')
            ->get();

        $uniquePostYears = Post::where('status', 'active')
            ->select(DB::raw('YEAR(post_date) as year'))
            ->distinct()
            ->orderBy('year', 'desc')
            ->pluck('year');

        $tableData = Post::with('images', 'category', 'upload_file', 'types', 'locations', 'topics', 'peoples','creators')
            ->where('status', 'active')
            ->orderBy('id', 'desc')
            ->paginate(6)
            ->onEachSide(1);
        // return $tableData;
        return Inertia::render('combodiaRecord/home/Index', [
            'tableData' => $tableData,
            'categoriesByOrderIndex' => $categoriesByOrderIndex,
            'categoriesById' => $categoriesById,
            'types' => $types,
            'publishers' => $publishers,
            'uniquePostYears' => $uniquePostYears,
            'location' => $location,
            'topic' => $topic,
            'typePeople' => $typePeople,
        ]);
    }

    public function post(Request $request)
    {
        $perPage = $request->input('perPage', 25);
        $search = $request->query('search');
        $category_code = $request->query('category_code');
        $type = $request->query('type');
        $year = $request->query('year');
        $publisher_id = $request->query('publisher_id');

        $types = Type::where('status', 'active')->orderBy('id', 'desc')->get();
        $publishers = Publisher::where('status', 'active')->orderBy('id', 'desc')->get();
        $categories = PostCategory::where('status', 'active')->orderBy('order_index')->get();
        $uniquePostYears = Post::where('status', 'active')
            ->select(DB::raw('YEAR(post_date) as year'))
            ->distinct()
            ->orderBy('year', 'desc')
            ->pluck('year');

        // 3. Start building the query.
        $query = Post::with('images', 'category', 'creator', 'upload_file')
            ->orderBy('id', 'desc');

        // 4. Apply filters if they exist.
        if ($category_code) {
            $category = PostCategory::with('children')->where('code', $category_code)->first();
            if ($category) {
                $categoryCodes = collect([$category->code])
                    ->merge($category->children->pluck('code'))
                    ->toArray();
                $query->whereIn('category_code', $categoryCodes);
            }
        }

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                $sub_query->where('title', 'LIKE', "%{$search}%")
                    ->orWhereHas('creator', function ($q) use ($search) {
                        $q->where('name', 'LIKE', "%{$search}%");
                    })
                    ->orWhereHas('publisher', function ($q) use ($search) {
                        $q->where('name', 'LIKE', "%{$search}%");
                    })
                    ->orWhereHas('location', function ($q) use ($search) {
                        $q->where('location_name', 'LIKE', "%{$search}%");
                    })
                    ->orWhereHas('publishing_country', function ($q) use ($search) {
                        $q->where('name', 'LIKE', "%{$search}%");
                    })
                    ->orWhereHas('topic', function ($q) use ($search) {
                        $q->where('topic_name', 'LIKE', "%{$search}%");
                    })
                    ->orWhereHas('people', function ($q) use ($search) {
                        $q->where('name', 'LIKE', "%{$search}%");
                    });
            });
        }

        if ($type) {
            $query->where('type', $type);
        }

        if ($year) {
            $query->whereYear('post_date', $year);
        }

        if ($publisher_id) {
            $query->where('publisher_id', $publisher_id);
        }

        // 5. Paginate the final results.
        $tableData = $query->paginate($perPage)->onEachSide(1);

        // return $tableData;
        return Inertia::render('combodiaRecord/home/Post', [
            'tableData' => $tableData,
            'types' => $types,
            'publishers' => $publishers,
            'categories' => $categories, // Pass categories to the view
            'uniquePostYears' => $uniquePostYears,
        ]);
    }


    public function detail($id, Request $request)
    {
        $postCategories = PostCategory::where('status', 'active')->orderBy('order_index')->get();
        $query = Post::query();
        $query->with(['images', 'category', 'creator', 'publisher', 'publishing_country', 'upload_file', 'types', 'locations', 'topics', 'peoples','creators','discourse']);
        $post = $query->find($id);
        $relatedPosts = Post::with('category', 'images')->where('id', '!=', $id)->where('category_code', $post->category_code)->orderBy('id', 'desc')->limit(6)->get();
        // return $post;
        return Inertia::render('combodiaRecord/home/Detail', [
            'post' => $post,
            'categories' => $postCategories,
            'relatedPosts' => $relatedPosts,
        ]);
    }
}
