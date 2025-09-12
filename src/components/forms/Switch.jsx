import { useState } from "react";
import Switch from "./Switch";

export default function SwitchExample() {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Switch
        label="Enable Notifications"
        checked={notifications}
        onChange={setNotifications}
        helperText="Aktifkan untuk menerima notifikasi"
      />
    </div>
  );
}
