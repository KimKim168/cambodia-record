<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateClientRequest;
use App\Helpers\ImageHelper;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Inertia;

class ClientController extends Controller
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:client view', only: ['index', 'show']),
            new Middleware('permission:client create', only: ['create', 'store']),
            new Middleware('permission:client update', only: ['edit', 'update', 'update_status']),
            new Middleware('permission:client delete', only: ['destroy', 'destroy_image']),
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

        $query = Client::query();

        if ($search) {
            $query->where(function ($sub_query) use ($search) {
                $sub_query->where('name', 'LIKE', "%{$search}%");
            });
        }

        $query->orderBy($sortBy, $sortDirection);

        $tableData = $query->paginate(perPage: 10)->onEachSide(1);

        return Inertia::render('admin/clients/Index', [
            'tableData' => $tableData,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
     public function create()
    {
        return Inertia::render('admin/clients/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
     public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:partners,name',
            'name_kh' => 'nullable|string|max:255',
            'phone' => 'nullable|numeric',
            'link' => 'nullable|max:255',
            'status' => 'nullable|string|in:active,inactive',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);

        $validated['created_by'] = $request->user()->id;
        $validated['updated_by'] = $request->user()->id;

        $image_file = $request->file('image');
        unset($validated['image']);

        foreach ($validated as $key => $value) {
    if ($value === '') {
        $validated[$key] = null;
    }
}

        if ($image_file) {
            try {
                $created_image_name = ImageHelper::uploadAndResizeImageWebp($image_file, 'assets/images/clients', 600);
                $validated['image'] = $created_image_name;
            } catch (\Exception $e) {
                return redirect()->back()->with('error', 'Failed to upload image: ' . $e->getMessage());
            }
        }

        Client::create($validated);

        return redirect()->route('clients.index')->with('success', 'Client created successfully!');
    }

    /**
     * Display the specified resource.
     */
   
     public function show(Client $client)
    {
        return Inertia::render('admin/clients/Show', [
            'client' => $client,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
      public function edit(Client $client)
    {
        return Inertia::render('admin/clients/Edit', [
            'client' => $client
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
     public function update(Request $request, Client $client)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:partners,name,' . $client->id,
            'name_kh' => 'nullable|string|max:255',
            'phone' => 'nullable|numeric',
            'link' => 'nullable|max:255',
            'status' => 'nullable|string|in:active,inactive',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
        ]);
        $validated['updated_by'] = $request->user()->id;

        $image_file = $request->file('image');
        unset($validated['image']);

        foreach ($validated as $key => $value) {
    if ($value === '') {
        $validated[$key] = null;
    }
}

        if ($image_file) {
            try {
                $created_image_name = ImageHelper::uploadAndResizeImageWebp($image_file, 'assets/images/clients', 600);
                $validated['image'] = $created_image_name;

                if ($client->image && $created_image_name) {
                    ImageHelper::deleteImage($client->image, 'assets/images/clients');
                }
            } catch (\Exception $e) {
                return redirect()->back()->with('error', 'Failed to upload image: ' . $e->getMessage());
            }
        }

        $client->update($validated);

        return redirect()->route('clients.index')->with('success', 'Client updated successfully!');
    }

    public function update_status(Request $request, client $client)
    {
        $request->validate([
            'status' => 'required|string|in:active,inactive',
        ]);
        $client->update([
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Status updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
     public function destroy(Client $client)
    {
        // Delete image if exists
        if ($client->image) {
            ImageHelper::deleteImage($client->image, 'assets/images/clients');
        }

        $client->delete();

        return redirect()->route('clients.index')->with('success', 'Client deleted successfully!');
    }
}
