<?php

namespace App\Http\Controllers;

use App\Models\Request as Petition;
use App\Models\RequestAttachment;
use App\Models\User;
use App\Models\Career;

class TotalsController extends Controller
{

    public function getTotals()
    {
        $totals = (object)[];
        $totals->users = User::all()->count();
        $totals->careers = Career::all()->count();
        $totals->requests = Petition::all()->count();
        $totals->files = RequestAttachment::all()->count();
        return response()->json($totals);
    }
    
}
