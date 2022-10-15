import usFlag from "../assets/images/flags/us.jpg"
import uz from "../assets/images/flags/uz.png"
import qq from "../assets/images/flags/qq.jpg"
import russia from "../assets/images/flags/russia.jpg"

const languages = {
  uz: {
    label: "O'zbekcha (lotin)",
    flag: uz
  },
  kr: {
    label: "Ўзбекча (кирилл)",
    flag: uz,
  },
  ru: {
    label: "Русский",
    flag: russia,
  },  
  qq: {
    label: "Qaraqalpaqsha",
    flag: qq,
  },

  en: {
    label: "English",
    flag: usFlag,
  },
}

export default languages
