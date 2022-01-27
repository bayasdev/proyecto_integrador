<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Dean;

class DeanController extends Controller
{
    public function showAllDeans()
    {
        return response()->json(Dean::all());
    }
    
    public function showOneDean($id)
    {
        return response()->json(Dean::find($id));
    }
    
    public function create(Request $request)
    {
        $this->validate($request, [
            'name' => 'required',
            'identification' => 'required|min:10|max:10|unique:deans'
        ]);
        $dean = Dean::create($request->all());
        return response()->json($dean, 201);
    }
    
    public function update($id, Request $request)
    {
        $dean = Dean::findOrFail($id);
        $dean->update($request->all());
        
        return response()->json($dean, 200);
    }
    
    public function delete($id)
    {
        Dean::findOrFail($id)->delete();
        return response(['message' => 'Eliminado correctamente'], 200);
    }
}
