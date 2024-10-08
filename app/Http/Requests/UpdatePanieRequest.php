<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePanieRequest extends FormRequest
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
            'acheteur_id' => ['required'],
            'produit_id' => ['required', 'exists:produits,id'],
            'produit_lot_id' => ['nullable'],
            'vendeur_id' => ['required', 'exists:users,id'],
            'commande_id' => ['nullable'],
            'quantite' => ['required', 'numeric'],
            'prix_totale' => ['required', 'numeric'],
            'prix' => ['required', 'numeric'],
        ];
    }
}
