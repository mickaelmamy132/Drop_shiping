<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProduitRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nom' => ['required', 'string', 'max:255'],
            'categorie_id' => ['required', 'exists:categories,id'],
            'quantite' => ['required', 'numeric'],
            'prix' => ['required', 'numeric', 'min:0'],
            'description' => ['required', 'string'],
            'etat' => ['required', 'string'],
            'image_rubrique' => ['nullable', 'file', 'mimes:jpeg,png,jpg,gif', 'max:50248'],
            'vendeur_id' => ['nullable'],
        ];
    }
}

