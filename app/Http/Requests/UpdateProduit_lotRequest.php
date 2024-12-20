<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProduit_lotRequest extends FormRequest
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
            'nom' => 'required|string|max:255',
            'description' => 'nullable|string',
            'quantite' => 'required|integer|min:1',
            'prix' => 'required|numeric|min:0',
            'etat' => 'required|string|max:255',
            'image_lot' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:50048',
            'vendeur_id' => 'required|exists:vendeurs,user_id',
            'categorie_id' => 'required|exists:categories,id',
        ];
    }
}
