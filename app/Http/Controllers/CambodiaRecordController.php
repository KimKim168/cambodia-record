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
use Illuminate\Http\Request;

class CambodiaRecordController extends Controller
{
    public function index()
    {
        $postCategories = PostCategory::where('status', 'active')->orderBy('order_index')->get();
        // return $categories;
        return Inertia::render('combodiaRecord/home/Index', [
            'categories' => $postCategories
        ]);
    }
    public function post(Request $request)
    {
        $perPage = $request->input('perPage', 25);
        $category_code = $request->query('category_code');
        $query = Post::query();
        $query->with( 'images', 'category', 'creator');
        if ($category_code) {
            // get category and its children codes
            $category = PostCategory::with('children')->where('code', $category_code)->first();

            if ($category) {
                $categoryCodes = collect([$category->code])
                    ->merge($category->children->pluck('code'))
                    ->toArray();
                $query->whereIn('category_code', $categoryCodes);
            }
        }
        $tableData = $query->paginate(perPage: $perPage)->onEachSide(1);
        // return $tableData;
        return Inertia::render('combodiaRecord/home/Post', [
            'tableData' => $tableData,
        ]);
    }


public function detail($id, Request $request)
{
    $postCategories = PostCategory::where('status', 'active')->orderBy('order_index')->get();
    $query = Post::query();
    $query->with( ['images', 'category', 'creator','publisher','publishing_country']);
    $post = $query->find($id);
    // return $post;
    return Inertia::render('combodiaRecord/home/Detail', [
        'post' => $post,
        'categories' => $postCategories,
    ]);
}

}
