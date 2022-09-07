export class BoardAPIDocs {
  static CreateOperation() {
    return {
      summary: '게시글 작성',
      description: '게시글을 작성합니다.',
    };
  }

  static GetListOperation() {
    return {
      summary: '게시글 리스트 조회',
      description: '게시글 목록 조회',
    };
  }

  static UpdateOpteration() {
    return {
      summary: '게시글 수정',
      description: '게시글을 수정합니다.',
    };
  }

  static DeleteOperation() {
    return {
      summary: '게시글 삭제',
      description: '게시글을 삭제합니다.',
    };
  }

  static NoContentResponse() {
    return {
      description: 'No Content',
    };
  }
}
