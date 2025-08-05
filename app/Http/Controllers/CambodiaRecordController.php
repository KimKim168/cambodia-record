<?php

namespace App\Http\Controllers;

use App\Models\BannerPosition;
use Inertia\Inertia;
use App\Models\Banner;
use App\Models\Item;
use App\Models\Page;

class CambodiaRecordController extends Controller
{
    public function index(){

        return Inertia::render('combodiaRecord/home/Index');
    }
     public function post(){

        return Inertia::render('combodiaRecord/home/Post');
    }

     public function detail($id){
        return Inertia::render('combodiaRecord/home/Detail',[
            'id' => $id,
        ]);
    }
    
}
