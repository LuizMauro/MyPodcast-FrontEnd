import styled from "styled-components";

export const IconWrapper = styled.div`
  position: relative;

  button.edit {
    position: absolute;
    right: 35px;
    top: 13px;
  }

  button.delete {
    position: absolute;
    right: 0;
    top: 13px;
  }

  button.edit-comment {
    position: absolute;
    right: 45px;
    top: 17px;
  }

  button.delete-comment {
    position: absolute;
    right: 13px;
    top: 17px;
  }

  .edit-answer {
    right: 45px !important;
  }

  .delete-answer {
    right: 10px !important;
  }
`;

export const CommentWrapper = styled.div`
  width:100%,
  background: #232659,
  min-height: 80px,
  max-height: auto,
  border-radius: 4px,
  padding: 10px,
  color: #fff,
`;
