<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class EnchereGagneeNotification extends Notification
{
    use Queueable;


    protected $produitLot;
    protected $montant;

    /**
     * Create a new notification instance.
     *
     * @param $produitLot
     * @param $montant
     */
    public function __construct($produitLot, $montant)
    {
        if (!$produitLot) {
            dd('Erreur: Produit lot est null');
        }
        if (!$montant) {
            dd('Erreur: Montant est null');
        }
        $this->produitLot = $produitLot;
        $this->montant = $montant;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        if (!$notifiable) {
            dd('Erreur: Notifiable est null');
        }
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        if (!$this->produitLot->nom) {
            dd('Erreur: Nom du produit lot est null');
        }
        if (!is_numeric($this->montant)) {
            dd('Erreur: Le montant n\'est pas un nombre valide');
        }
        return (new MailMessage)
        ->subject('Félicitations, vous avez gagné une enchère !')
        ->line('Vous avez remporté l\'enchère pour le lot : ' . $this->produitLot->nom . ' (Enchere #:'.$this->produitLot->id.')')
        ->line('Date de la victoire : ' . now()->format('d/m/Y H:i:s'))
        ->line('Montant final : ' . number_format($this->montant, 2) . ' €')
        ->action('Voir votre lot', url('http://127.0.0.1:8000/Panie'))
        ->line('Merci pour votre participation aux enchères !');
    }
    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
