const wifi = require('node-wifi');

wifi.init({
    iface: null // network interface, choose a random wifi interface if set to null
  });
  
  // Scan networks
  wifi.scan((error, networks) => {
    if (error) {
      console.log(error);
    } else {
      console.log(networks);
      /*
          networks = [
              {
                ssid: '...',
                bssid: '...',
                mac: '...', // equals to bssid (for retrocompatibility)
                channel: <number>,
                frequency: <number>, // in MHz
                signal_level: <number>, // in dB
                quality: <number>, // same as signal level but in %
                security: 'WPA WPA2' // format depending on locale for open networks in Windows
                security_flags: '...' // encryption protocols (format currently depending of the OS)
                mode: '...' // network mode like Infra (format currently depending of the OS)
              },
              ...
          ];
          */
    }
  });