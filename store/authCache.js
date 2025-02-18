import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cache } from "react-native-cache";

const authCache = new Cache({
    namespace: "auth",
    policy: {
        maxEntries: 50000, // número máximo de entradas, si no se especifica, puede tener entradas ilimitadas
        stdTTL: 0 // tiempo de vida (TTL) estándar en segundos, por defecto: 0 (ilimitado)
    },
    backend: AsyncStorage
  });

export default authCache;