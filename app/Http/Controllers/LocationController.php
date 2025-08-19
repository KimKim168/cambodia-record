<?php

namespace App\Http\Controllers;

use App\Models\Creator;
use App\Models\Location;
use Illuminate\Http\Request;

use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class LocationController extends Controller
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:post view', only: ['index', 'show', 'all_page_categories']),
            new Middleware('permission:post create', only: ['create', 'store']),
            new Middleware('permission:post update', only: ['edit', 'update', 'update_status']),
            new Middleware('permission:post delete', only: ['destroy', 'destroy_image']),
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('search', '');
        $sortBy = $request->input('sortBy', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $status = $request->input('status');

        $query = Location::query();

        $query->with('created_by', 'updated_by');

        if ($status) {
            $query->where('status', $status);
        }
        $query->orderBy($sortBy, $sortDirection);

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                return $sub_query->where('location_name', 'LIKE', "%{$search}%");
            });
        }
        $tableData = $query->paginate(perPage: 10)->onEachSide(1);

        return Inertia::render('admin/post_locations/Index', [
            'tableData' => $tableData,
        ]);
    }

    public function all_post_locations()
    {
        $query = Location::query();

        $tableData = $query->where('status', 'active')->orderBy('id', 'desc')->get();

        return response()->json($tableData);
    }
      /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'location_name' => 'required|string|max:255',
            'status' => 'nullable|string|in:active,inactive',
        ]);

        $validated['created_by'] = $request->user()->id;
        $validated['updated_by'] = $request->user()->id;



        foreach ($validated as $key => $value) {
            if ($value === '') {
                $validated[$key] = null;
            }
            Location::create($validated);

            return redirect()->back()->with('success', 'Post location created successfully!');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Location $creator)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function update(Request $request, Location $post_location)
    {
        $validated = $request->validate([
            'location_name' => 'required|string|max:255',
            'status' => 'nullable|string|in:active,inactive',
        ]);

        $validated['updated_by'] = $request->user()->id;


        foreach ($validated as $key => $value) {
            if ($value === '') {
                $validated[$key] = null;
            }
        }

        $post_location->update($validated);

        return redirect()->back()->with('success', 'Location updated successfully!');
    }
    /**
     * Update the specified resource in storage.
     */
    public function update_status(Request $request, Location $post_location)
    {
        $request->validate([
            'status' => 'required|string|in:active,inactive',
        ]);
        $post_location->update([
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Status updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */

    public function destroy(Location $post_location)
    {
        $post_location->delete();
        return redirect()->back()->with('success', 'Location deleted successfully.');
    }
}
