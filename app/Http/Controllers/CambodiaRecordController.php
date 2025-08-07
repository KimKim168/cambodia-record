<?php

namespace App\Http\Controllers;

use App\Models\BannerPosition;
use Inertia\Inertia;
use App\Models\Banner;
use App\Models\Creator;
use App\Models\Item;
use App\Models\Page;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\Publisher;
use App\Models\Type;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class CambodiaRecordController extends Controller
{
    public function index()
    {
        $postCategories = PostCategory::where('status', 'active')->orderBy('order_index')->get();
        $types = Type::where('status', 'active')->orderBy('id', 'desc')->get();

        $category = PostCategory::where('status', 'active')->orderBy('id', 'desc')->get();
        $publisher = Publisher::where('status', 'active')->orderBy('id', 'desc')->get();
        $uniquePostYears = Post::where('status', 'active')
            ->select(DB::raw('YEAR(post_date) as year'))
            ->distinct()
            ->orderBy('year', 'desc') // Order by the year itself
            ->pluck('year');

        // return $uniquePostYears;
        return Inertia::render('combodiaRecord/home/Index', [
            'categories' => $postCategories,
            'types' => $types,
            'category' => $category,
            'publisher' => $publisher,
            'uniquePostYears' => $uniquePostYears,
        ]);
    }
    public function post(Request $request)
    {
        // 1. Fetch all data needed for the filters upfront.
        $types = Type::where('status', 'active')->orderBy('id', 'desc')->get();
        $publishers = Publisher::where('status', 'active')->orderBy('id', 'desc')->get();
        $categories = PostCategory::where('status', 'active')->orderBy('order_index')->get();
        $uniquePostYears = Post::where('status', 'active')
            ->select(DB::raw('YEAR(post_date) as year'))
            ->distinct()
            ->orderBy('year', 'desc')
            ->pluck('year');

        // 2. Get all possible filter parameters from the request.
        $perPage = $request->input('perPage', 25);
        $search = $request->query('search');
        $category_code = $request->query('category_code');
        $type = $request->query('type');
        $year = $request->query('year');
        $publisher_id = $request->query('publisher_id');

        // 3. Start building the query.
        $query = Post::query();
        $query->with('images', 'category', 'creator', 'upload_file');

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
                $sub_query->where('title', 'LIKE', "%{$search}%");
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
        $tableData = $query->paginate(perPage: $perPage)->onEachSide(1);

        // 6. Return the view with both the results and the filter data.
        return Inertia::render('combodiaRecord/home/Post', [
            'tableData' => $tableData,
            'types' => $types,
            'publisher' => $publishers,
            'category' => $categories, // Pass categories to the view
            'uniquePostYears' => $uniquePostYears,
        ]);
    }


    public function detail($id, Request $request)
    {
        $postCategories = PostCategory::where('status', 'active')->orderBy('order_index')->get();
        $query = Post::query();
        $query->with(['images', 'category', 'creator', 'publisher', 'publishing_country', 'upload_file']);
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
