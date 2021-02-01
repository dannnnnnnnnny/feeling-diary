export class CreatePostDto {
  title: string;
  message: string;
}

// dto는 interface보다 class를 권장 (interface는 컴파일 후 유지X)
// dto는 필수항목은 아니지만, dto를 사용함으로써 코드를 쉽게 유지, 리팩토링이 가능해짐
