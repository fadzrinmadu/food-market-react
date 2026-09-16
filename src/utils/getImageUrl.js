import { config } from '../config';

export function getImageUrl(filename){
  return `${config.api_host}/upload/${filename}`;
}
