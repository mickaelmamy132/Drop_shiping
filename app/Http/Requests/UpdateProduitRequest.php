<?php

namespace App\Http\Requests; 

use Illuminate\Foundation\Http\FormRequest;

class UpdateProduitRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nom' => 'required|string',
            'categorie_id' => 'required|exists:categories,id',
            'quantite' => 'required|integer|min:1',
            'prix' => 'required|numeric|min:0',
            'description' => 'required|string',
            'etat' => 'required|string',
            'image_rubrique' => 'nullable|image',
            'vendeur_id' => 'required|exists:users,id',
        ];
    }
}
