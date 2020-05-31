export function createPublicidadeRequest(
  pub_descricao,
  pub_data_fim,
  file,
  pub_link
) {
  return {
    type: "@podcast/CREATE_PUBLICIDADE_REQUEST",
    payload: { pub_descricao, pub_data_fim, file, pub_link },
  };
}

export function updatePublicidadeRequest(
  pub_id,
  pub_descricao,
  pub_data_fim,
  file,
  pub_link
) {
  return {
    type: "@podcast/UPDATE_PUBLICIDADE_REQUEST",
    payload: { pub_id, pub_descricao, pub_data_fim, file, pub_link },
  };
}

export function deletePublicidadeRequest(pub_id) {
  return {
    type: "@podcast/DELETE_PUBLICIDADE_REQUEST",
    payload: { pub_id },
  };
}
