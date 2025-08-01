<?php

namespace App\Http\Controllers;

use App\Models\BannerPosition;
use Inertia\Inertia;
use App\Models\Banner;
use App\Models\Item;
use App\Models\Page;

class RuleLibraryController extends Controller
{
    public function index(){
        $slide = Banner::where('position_code', 'SLIDE_SHOW')->orderBy('order_index')->where('status', 'active')->get();
       $newBooks = Item::where('category_code', 'NEW_BOOKS')->with('images')->get();
       $researchPaper = Item::where('category_code', 'RESEARCH_PAPERS')->with('images')->get();       
        // return $newBooks;
        return Inertia::render('rule-library/Index',[
            'slide' => $slide,
            'newBooks' => $newBooks,
            'researchPaper' => $researchPaper,
        ]);
    }
    public function about(){
        $banner = BannerPosition::where('code', 'ABOUT_PAGE_BANNER')->first();
        $aboutPage = Page::where('code', 'ABOUT_PAGE')->with('images')->get();
        $ourValues = Page::where('code', 'OUR_VALUES')->with(['children.images'])->get();
        //  return $ourValues;
        return Inertia::render('rule-library/About',[
            'banner' => $banner,
            'aboutPage' => $aboutPage,
            'ourValues' => $ourValues,
        ]); 
    }
    public function resources(){
        
        return Inertia::render('rule-library/Resources');
    }
    
    public function databases(){
        return Inertia::render('rule-library/Databases');
    }
    public function collections(){
        $banner = BannerPosition::where('code', 'COLLECTION_PAGE_BANNER')->first();
        return Inertia::render('rule-library/Collection',[
            'banner' => $banner,
        ]);
    }

    public function contact(){
        return Inertia::render('rule-library/Contact');
    }

     public function detail($id){
        return Inertia::render('rule-library/Detail',[
            'id' => $id,
        ]);
    }
    
}
