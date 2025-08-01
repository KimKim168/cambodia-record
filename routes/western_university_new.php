<?php

use App\Http\Controllers\CareerSubmitController;
use App\Http\Controllers\MessageController;
use App\Models\Banner;
use App\Models\Career;
use App\Models\Page;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\PostDailyView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/test_component', function () {
//     return Inertia::render('test/TestComponent');
// });


Route::post('/submit-message', [MessageController::class, 'store']);
Route::post('/submit_career', [CareerSubmitController::class, 'store']);

Route::get('/', function () {
    $banners = Banner::where('position_code', 'HOME_SLIDE_TOP')->orderBy('order_index')->where('status', 'active')->get();
    $middleSlide = Banner::where('position_code', 'HOME_SLIDE_MIDDLE')->orderBy('order_index')->where('status', 'active')->get();
    $slideBottom = Banner::where('position_code', 'HOME_SLIDE_BOTTOM')->orderBy('order_index')->where('status', 'active')->get();
    $WelcomeToWestern = Page::where('code', 'WELCOME_TO_WESTERN')->with('images')->where('status', 'active')->first();

    $Statistics = Page::where('code', 'STATISTICS')
        ->with([
            'children' => fn($sub_query) => $sub_query->where('status', 'active')->orderBy('order_index')->with('images'),
        ])
        ->get();

    $activitiesAndEvents = Page::where('code', 'ACTIVITIES_AND_EVENTS')
        ->with([
            'children' => fn($sub_query) => $sub_query->where('status', 'active')->orderBy('order_index')->with('images'),
        ])
        ->first();

    $tableData = Post::where('category_code', 'NEWS')
        ->with(['images'])
        ->where('status', 'active')->limit(6)
        ->get();
    $outreachPrograms = Page::where('code', 'OUTREACH_PROGRAMS')
        ->with([
            'images',
            'children' => fn($sub_query) => $sub_query->where('status', 'active')->orderBy('order_index')->limit(3)->with('images'),
        ])
        ->where('status', 'active')
        ->first();
    // return $outreachPrograms;
    return Inertia::render('westernUniversityNew/Home', [
        'banners' => $banners,
        'middleSlide' => $middleSlide,
        'slideBottom' => $slideBottom,
        'WelcomeToWestern' => $WelcomeToWestern,
        'Statistics' => $Statistics,
        'tableData' => $tableData,
        'activitiesAndEvents' => $activitiesAndEvents,
        'outreachPrograms' => $outreachPrograms,
    ]);
});

Route::get('/contact', function () {
    $contact = Page::where('code', 'CONTACT')->orderBy('order_index')->where('status', 'active')->first();

    $careers = Page::where('code', 'CAREERS')
        ->with([
            'children' => fn($sub_query) => $sub_query->where('status', 'active')->orderBy('order_index')->with('images'),
        ])
        ->first();
    //  return $careers;
    return Inertia::render('westernUniversityNew/Contact', [
        'contact' => $contact,
        'careers' => $careers,
    ]);
});

Route::get('/history_and_values', function () {
    $hestoryTitle = Page::where('code', 'HISTORY_AND_VALUES')->orderBy('order_index')->where('status', 'active')->first();
    $ourHestory = Page::where('code', 'OUR_HISTORY')->with('images')->orderBy('order_index')->where('status', 'active')->first();
    $vision = Page::where('code', 'OUR_VISION')->with('images')->orderBy('order_index')->where('status', 'active')->first();
    $mission = Page::where('code', 'OUR_MISSION')->with('images')->orderBy('order_index')->where('status', 'active')->first();
    $valuesWiscare = Page::where('code', 'VALUES_WISCARE')->with([
        'children' => fn($sub_query) => $sub_query->where('status', 'active')->orderBy('order_index')->with('images'),
    ])
        ->first();
    //use get() result is it catch data to array [], use first() 
    // return $valuesWiscare;
    return Inertia::render('westernUniversityNew/About/HistoryAndValues', [
        'hestoryTitle' => $hestoryTitle,
        'ourHestory' => $ourHestory,
        'vision' => $vision,
        'mission' => $mission,
        'valuesWiscare' => $valuesWiscare,
    ]);
});

Route::get('/school_facilities', function () {
    $schoolFacilities = Page::where('code', 'SCHOOL_FACILITIES')
        ->with([
            'children' => fn($sub_query) => $sub_query->where('status', 'active')->orderBy('order_index', 'desc')->with('images'),
        ])
        ->first();
    // return $schoolFacilities;
    return Inertia::render('westernUniversityNew/About/SchoolFacilities', [
        'schoolFacilities' => $schoolFacilities,
    ]);
});

Route::get('/campuses', function () {
    $campuses = Page::where('code', 'CAMPUSES')
        ->with([
            'children' => fn($sub_query) => $sub_query->where('status', 'active')->orderBy('order_index')->with('images'),
        ])
        ->first();
    // return $campuses;
    return Inertia::render('westernUniversityNew/About/Campuses', [
        'campuses' => $campuses,
    ]);
});


Route::get('/student_council', function () {
    $studentCouncil = Page::where('code', 'STUDENT_COUNCIL')
        ->with([
            'images', // Main image code STUDENT_COUNCIL
        ])
        // ->with('image') 
        ->where('status', 'active')
        ->first();

    $gradeLevelLeaders = Page::where('code', 'GRADE_LEVEL_LEADERS')
        ->with([
            // 'images', // Main image code STUDENT_COUNCIL
            'children' => fn($sub_query) => $sub_query->where('status', 'active')->orderBy('order_index')->with('images'),
        ])
        // ->with('image') 
        ->first();

    $campusRepresentative = Page::where('code', 'CAMPUS_REPRESENTATIVES')
        ->with([
            // 'images', // Main image code STUDENT_COUNCIL
            'children' => fn($sub_query) => $sub_query->where('status', 'active')->orderBy('order_index')->with('images'),
        ])
        // ->with('image') 
        ->first();

    $studentCouncilInAction = Page::where('code', 'STUDENT_COUNCIL_IN_ACTION')
        ->with([
            // 'images', // Main image code STUDENT_COUNCIL
            'children' => fn($sub_query) => $sub_query->where('status', 'active')->orderBy('order_index')->with('images'),
        ])
        // ->with('image') 
        ->first();

    // return $gradeLevelLeaders;
    return Inertia::render('westernUniversityNew/About/StudentCouncil', [
        'studentCouncil' => $studentCouncil,
        'gradeLevelLeaders' => $gradeLevelLeaders,
        'campusRepresentative' => $campusRepresentative,
        'studentCouncilInAction' => $studentCouncilInAction,
    ]);
});

Route::get('/curriculum', function () {
    $studentCouncilInAction = Page::where('code', 'STUDENT_COUNCIL_IN_ACTION')
        ->with([
            // 'images', // Main image code STUDENT_COUNCIL
            'children' => fn($sub_query) => $sub_query->where('status', 'active')->orderBy('order_index')->with('images'),
        ])
        // ->with('image') 
        ->first();
    $curriculum = Page::where('code', 'CURRICULUM')->with('images')->orderBy('order_index')->where('status', 'active')->first();
    // return $curriculum;
    return Inertia::render('westernUniversityNew/Academics/Curriculum', [
        'studentCouncilInAction' => $studentCouncilInAction,
        'curriculum' => $curriculum,
    ]);
});

Route::get('/school_calendar', function () {
    $schoolCalendar = Post::where('category_code', 'SCHOOL_CALENDAR')
        ->with(['images'])
        ->where('status', 'active')
        ->get();
    // return $schoolCalendar;
    return Inertia::render('westernUniversityNew/Academics/SchoolCalendars', [
        'schoolCalendar' => $schoolCalendar,
    ]);
});

Route::get('/programs', function () {
    $programs = Page::where('code', 'PROGRAMS')
        ->with([
            'children' => fn($sub_query) => $sub_query->where('status', 'active')->orderBy('order_index')->with('images'),
        ])
        ->first();
    // return $programs;
    return Inertia::render('westernUniversityNew/Academics/Programs', [
        'programs' => $programs,
    ]);
});

Route::get('/class_schedules_and_subjects', function () {
    $schedulesAndSubjects = Page::where('code', 'CLASS_SCHEDULES_AND_SUBJECTS')->where('status', 'active')->first();
    // return $schedulesAndSubjects;
    return Inertia::render('westernUniversityNew/Academics/ClassScheduleAndSubject', [
        'schedulesAndSubjects' => $schedulesAndSubjects,
    ]);
});

Route::get('/admissions', function () {
    $admissions = Page::where('code', 'ADMISSIONS')->where('status', 'active')->first();
    // return $admissions;
    return Inertia::render('westernUniversityNew/Admission/Index', [
        'admissions' => $admissions,
    ]);
});

Route::get('/news', function (Request $request) {
    $search = $request->input('search', '');
    $sortBy = $request->input('sortBy', 'id');
    $sortDirection = $request->input('sortDirection', 'desc');
    $status = $request->input('status');
    $category_code = $request->input('category_code');

    $query = Post::query();

    $query->with('created_by', 'updated_by', 'images', 'category', 'source_detail');

    if ($status) {
        $query->where('status', $status);
    } else {
        $query->where('status', 'active');
    }

    if ($category_code) {
        $query->where('category_code', $category_code);
    } else {
        $query->whereIn('category_code', ['NEWS', 'BLOGS']);
    }

    $query->orderBy($sortBy, $sortDirection);

    if ($search) {
        $query->where(function ($sub_query) use ($search) {
            return $sub_query->where('title', 'LIKE', "%{$search}%")
                ->orWhere('title_kh', 'LIKE', "%{$search}%");
        });
    }

    $tableData = $query->paginate(perPage: 12)->onEachSide(1);

    return Inertia::render('westernUniversityNew/SchoolLife/News', [
        'tableData' => $tableData,
        'postCategories' => PostCategory::where('status', 'active')
            ->whereIn('code', ['NEWS', 'BLOGS'])
            ->orderBy('id', 'desc')
            ->get(),
    ]);
});

Route::get('/news/{id}', function ($id) {
    $showData = Post::where('id', $id)
        ->where('status', 'active')
        ->with('images')
        ->first();
    $relatedPosts = Post::with('category', 'images')->where('id', '!=', $id)->where('category_code', $showData->category_code)->orderBy('id', 'desc')->limit(6)->get();

    $date = now()->toDateString();
    $view = PostDailyView::firstOrCreate(
        ['post_id' => $id, 'view_date' => $date],
        ['view_counts' => 0],
    );

    $view->increment('view_counts');

    $showData->update([
        'total_view_counts' => $showData->total_view_counts + 1,
    ]);
    // return ($showData);
    return Inertia::render('westernUniversityNew/news/show', [
        'showData' => $showData,
        'relatedPosts' => $relatedPosts,
    ]);
});


Route::get('/student_services', function () {
    $studentServices = Page::where('code', 'STUDENT_SERVICES')
        ->with([
            'children' => fn($sub_query) => $sub_query->where('status', 'active')->orderBy('order_index')->with('images'),
        ])
        ->first();

    return Inertia::render('westernUniversityNew/SchoolLife/studentServices', [
        'studentServices' => $studentServices
    ]);
});

Route::get('/job_opportunities', function () {
    $jobOpportunities = Career::where('status', 'active')->get();
    // return $jobOpportunities;
    return Inertia::render('westernUniversityNew/career/jobOpportunities', [
        'jobOpportunities' => $jobOpportunities
    ]);
});


Route::get('/activities_and_events', function () {
    $activitiesAndEvents = Page::where('code', 'ACTIVITIES_AND_EVENTS')
        ->with([
            'children' => fn($sub_query) => $sub_query->orderBy('order_index')->where('status', 'active')->with('images'),
        ])
        ->first();
    // return $activitiesAndEvents;
    return Inertia::render('westernUniversityNew/SchoolLife/ActivitiesAndEvents', [
        'activitiesAndEvents' => $activitiesAndEvents,
    ]);
});
Route::get('/extracurricular_activities', function () {
    $extracurricularActivities = Page::where('code', 'EXTRACURRICULAR_ACTIVITIES')
        ->with([
            'children' => fn($sub_query) => $sub_query->orderBy('order_index')->where('status', 'active')->with('images'),
        ])
        ->first();
    return Inertia::render('westernUniversityNew/SchoolLife/ExtracurricularActivities', [
        'extracurricularActivities' => $extracurricularActivities,
    ]);
});

Route::get('/outreach_programs', function () {
    $outreachPrograms = Page::where('code', 'OUTREACH_PROGRAMS')
        ->with([
            'children' => fn($sub_query) => $sub_query->orderBy('order_index')->where('status', 'active')->with('images'),
        ])
        ->first();
    // return $outreachPrograms;
    return Inertia::render('westernUniversityNew/SchoolLife/OutreachPrograms', [
        'outreachPrograms' => $outreachPrograms,
    ]);
});

Route::get('/outreach_programs/{id}', function ($id) {
    $showData = Page::where('id', $id)->with('images')->first();
    // return $showData;
    return Inertia::render('westernUniversityNew/outreachPrograms/Show', [
        'showData' => $showData,
    ]);
});

Route::get('/detail/{id}', function ($id) {
    $showData = Post::where('id', $id)->with('images')->first();
    $relatedPosts = Post::with('category', 'images')->where('id', '!=', $id)->where('category_code', $showData->category_code)->orderBy('id', 'desc')->limit(6)->get();

    //  return $relatedPosts;
    return Inertia::render('westernUniversityNew/Academics/Detail', [
        'showData' => $showData,
        'relatedPosts' => $relatedPosts,
    ]);
});

    // public function detail($id)
    // {
    //     $showData = Item::findOrFail($id);
    //     $relatedPosts = Item::with('category', 'images')->where('id', '!=', $id)->where('category_code', $showData->category_code)->orderBy('id', 'desc')->limit(6)->get();
    //     return Inertia::render('rule-library/Detail', [
    //         'showData' => $showData->load('images', 'category'),
    //         'relatedPosts' => $relatedPosts,
    //     ]);
    // }
// Route::get('/careers', function () {
//     return Inertia::render('westernuniversity/contact/Careers');
// })->name('careers');
