import styled from "styled-components";

export const IconWrapper = styled.div`
  position: relative;

  button.edit {
    position: absolute;
    right: 35px;
    top: 0;
  }

  button.delete {
    position: absolute;
    right: 0;
    top: 0;
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
