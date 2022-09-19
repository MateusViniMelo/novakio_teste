<?php

namespace App\Http\Controllers;

use App\Models\Texto;
use Illuminate\Http\Request;

class TextoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $textos = Texto::all();

        return response()->json($textos);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $regras = [
            "texto" => "required|min:8|max:500"
        ];

        $feedback = [
            "texto.required" => "O texto não pode ser vazio",
            "texto.min" => "O texto deve conter no mínimo 8 caracteres",
            "texto.max" => "O texto deve conter no máximo 500 caracteres"
        ];


        $request->validate($regras,$feedback);

        $texto = Texto::create($request->all());

        return response()->json($texto);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Texto  $texto
     * @return \Illuminate\Http\Response
     */
    public function show(Texto $texto)
    {
        return response()->json($texto);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Texto  $texto
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Texto $texto)
    {
        $regras = [
            "texto" => "required|min:8|max:500"
        ];

        $feedback = [
            "texto.required" => "O texto não pode ser vazio",
            "texto.min" => "O texto deve conter no mínimo 8 caracteres",
            "texto.max" => "O texto deve conter no máximo 500 caracteres"
        ];

        
        $request->validate($regras,$feedback);

        $texto->texto = $request->texto;

        $texto->save();
        return response()->json($texto);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Texto  $texto
     * @return \Illuminate\Http\Response
     */
    public function destroy(Texto $texto)
    {
        $texto->delete();
    }
}
