export const second_to_hms = (d) => {
        d = Number(d);
        var h = Math.floor(d / 3600);
        var m = Math.floor(d % 3600 / 60);
        var s = Math.floor(d % 3600 % 60);

        var hDisplay = h > 0 ? h + (h == 1 ? " soat, " : " soat, ") : "";
        var mDisplay = m > 0 ? m + (m == 1 ? " daqiqa " : " daqiqa ") : "";
        var sDisplay = s > 0 ? s + (s == 1 ? " soniya" : " soniya") : "";
        return hDisplay + mDisplay + sDisplay;
    }