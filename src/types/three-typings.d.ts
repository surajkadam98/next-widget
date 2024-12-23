declare module 'three/examples/jsm/loaders/OBJLoader' {
    import { Object3D } from 'three';
  
    export class OBJLoader {
      load(
        url: string,
        onLoad: (object: Object3D) => void,
        onProgress?: (event: ProgressEvent) => void,
        onError?: (event: ErrorEvent) => void
      ): void;
      
      parse(data: string | ArrayBuffer): Object3D;
    }
  }