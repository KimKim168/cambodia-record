<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePublishingCountryRequest;
use App\Http\Requests\UpdatePublishingCountryRequest;
use App\Models\PublishingCountry;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Routing\Controllers\Middleware;

class PublishingCountryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public static function middleware(): array
    {
        return [
            new Middleware('permission:post view', only: ['index', 'show', 'all_page_categories']),
            new Middleware('permission:post create', only: ['create', 'store']),
            new Middleware('permission:post update', only: ['edit', 'update', 'update_status']),
            new Middleware('permission:post delete', only: ['destroy', 'destroy_image']),
        ];
    }
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $status = $request->input('status');

        $query = PublishingCountry::query();

        $query->with('created_by', 'updated_by');

        if ($status) {
            $query->where('status', $status);
        }
        $query->orderBy($sortBy, $sortDirection);

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                return $sub_query->where('name', 'LIKE', "%{$search}%");
            });
        }

        $tableData = $query->paginate(perPage: 10)->onEachSide(1);
        return Inertia::render('admin/post_publishing_countries/Index', [
            'tableData' => $tableData,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    public function all_page_publishing_countries()
    {
        $query = PublishingCountry::query();

        $tableData = $query->where('status', 'active')->orderBy('id', 'desc')->get();

        return response()->json($tableData);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:255|unique:publishing_countries,code',
            'status' => 'nullable|string|in:active,inactive',
        ]);

        $validated['created_by'] = $request->user()->id;
        $validated['updated_by'] = $request->user()->id;



        foreach ($validated as $key => $value) {
            if ($value === '') {
                $validated[$key] = null;
            }
            PublishingCountry::create($validated);

            return redirect()->back()->with('success', 'Post Publishing Country created successfully!');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(PublishingCountry $publishingCountry)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PublishingCountry $publishingCountry)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */

    public function update(Request $request, PublishingCountry $publishing_country)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'nullable|string|max:255|unique:publishing_countries,code,' . $publishing_country->id,
            'status' => 'nullable|string|in:active,inactive',
        ]);

        $validated['updated_by'] = $request->user()->id;


        foreach ($validated as $key => $value) {
            if ($value === '') {
                $validated[$key] = null;
            }
        }

        $publishing_country->update($validated);


        return redirect()->back()->with('success', 'Publishing Country updated successfully!');
    }

    public function update_status(Request $request, PublishingCountry $publishing_country)
    {
        $request->validate([
            'status' => 'required|string|in:active,inactive',
        ]);
        $publishing_country->update([
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Status updated successfully!');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PublishingCountry $post_publishing_country)
    {
        // dd($post_publishing_country);
        $post_publishing_country->delete();
        return redirect()->back()->with('success', 'Publishing Country deleted successfully.');
    }
}
