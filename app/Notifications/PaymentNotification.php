<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class PaymentNotification extends Notification 
{
    use Queueable;

    protected $envoi;

    /**
     * Create a new notification instance.
     *
     * @param $envoi
     */
    public function __construct($envoi)
    {
        if (is_null($envoi)) {
            throw new \InvalidArgumentException('L\'envoi ne peut pas être null');
        }
       
        $this->envoi = $envoi;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        if (is_null($notifiable)) {
            throw new \InvalidArgumentException('Notifiable ne peut pas être null');
        }
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Vous avez reçu une nouvelle commande')
            ->line('Une nouvelle commande a été effectuée')
            ->line('Date de la commande : ' . now()->format('d/m/Y H:i:s'))
            ->action('Voir la commande', route('commande.index'))
            ->line('Merci de traiter cette commande !');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'envoi' => $this->envoi,
            'date_envoi' => now()->format('Y-m-d H:i:s')
        ];
    }
}
