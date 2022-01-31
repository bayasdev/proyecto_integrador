<?php

namespace App\Listeners;

use App\Events\RequestCreated;

class SendRequestNotification
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  RequestCreated  $event
     * @return void
     */
    public function handle(RequestCreated $event)
    {
        //
    }
}
