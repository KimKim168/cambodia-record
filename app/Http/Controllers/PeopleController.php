<?php

namespace App\Http\Controllers;

use App\Models\People;
use App\Models\Topic;
use App\Models\Type;
use Illuminate\Http\Request;

use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class PeopleController extends Controller
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

        $query = People::query();

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

        $typePeople = Type::where(['status' => 'active', 'type_of' => 'people'])->orderBy('id','desc')->get();
       
        return Inertia::render('admin/post_people/Index', [
            'tableData' => $tableData,
            'typePeople' => $typePeople,
        ]);
    }

    public function all_page_people()
    {
        $query = People::query();

        $tableData = $query->where('status', 'active')->orderBy('id', 'desc')->get();

        return response()->json($tableData);
    }
      /**
     * Store a newly created resource in storage.
     */
     public function create(Request $request)
    {
        return Inertia::render('admin/post_people/Create', props: [
            'typePeople' => Type::where(['status' => 'active', 'type_of' => 'people'])->orderBy('id', 'desc')->get(),
        ]);
    }
    public function show(People $post_people)
    {
        return Inertia::render('admin/post_people/Create', [
            'typePeople' => Type::where(['status' => 'active', 'type_of' => 'people'])->orderBy('id', 'desc')->get(),
            
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'nullable|string',
            'status' => 'nullable|string|in:active,inactive',
        ]);

        $validated['created_by'] = $request->user()->id;
        $validated['updated_by'] = $request->user()->id;

        foreach ($validated as $key => $value) {
            if ($value === '') {
                $validated[$key] = null;
            }
            People::create($validated);

            return redirect()->back()->with('success', 'Post topic created successfully!');
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function update(Request $request, People $post_people)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'nullable|string',
            'status' => 'nullable|string|in:active,inactive',
        ]);

        $validated['updated_by'] = $request->user()->id;


        foreach ($validated as $key => $value) {
            if ($value === '') {
                $validated[$key] = null;
            }
        }

        $post_people->update($validated);

        return redirect()->back()->with('success', 'People updated successfully!');
    }
    /**
     * Update the specified resource in storage.
     */
    public function update_status(Request $request, People $post_people)
    {
        $request->validate([
            'status' => 'required|string|in:active,inactive',
        ]);
        $post_people->update([
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Status updated successfully!');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(People $post_person)
    {
        // dd($post_person);
        $post_person->delete();
        return redirect()->back()->with('success', 'People deleted successfully.');
    }
}
