import React from "react";
import { useState } from "react";

export default function NotificationFavori({
  isActiveNotificationFavori,
  setIsActiveNotificationFavori,
}) {
  return (
    <div>
      <div class="notification is-info">
        <button
          class="delete"
          onClick={() =>
            setIsActiveNotificationFavori(!isActiveNotificationFavori)
          }
        ></button>
        Un <strong>jeu</strong> a été ajouté à votre <a>liste de favoris.</a>
      </div>
    </div>
  );
}
