import { socket } from "../socket";

let watchId = null;

export const startTracking = (
  jobId
) => {
  socket.emit("join_job", jobId);

  if (!navigator.geolocation) {
    alert(
      "Geolocation not supported"
    );
    return;
  }

  watchId =
    navigator.geolocation.watchPosition(
      (position) => {
        const lat =
          position.coords.latitude;

        const lng =
          position.coords.longitude;

        socket.emit(
          "worker_location",
          {
            jobId,
            lat,
            lng,
          }
        );

        console.log(
          "📍 Live Location Sent:",
          lat,
          lng
        );
      },

      (error) => {
        console.log(error);
      },

      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 5000,
      }
    );
};

export const stopTracking = () => {
  if (watchId) {
    navigator.geolocation.clearWatch(
      watchId
    );
  }
};