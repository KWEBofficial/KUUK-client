/**
 * ResultRestaurant model
 * ResultRestaurant 객체의 타입을 정의해 놓은 인터페이스입니다.
 * 필요에 따라 수정하거나 삭제하셔도 됩니다.
 * 자주 쓰이는 인터페이스는 models 폴더에 정의해 놓고 import해서 사용하면 됩니다.
 * @interface ResultRestaurant
 * @property {number} id - 식당 id
 * @property {string} restaurantName - 식당 이름
 * @property {string} imgDir - 식당 이미지 디렉토리
 * @property {string} description - 식당 설명
 */
export interface ResultRestaurant {
  id: number;
  restaurantName: string;
  imgDir?: string;
  description: string;
}
