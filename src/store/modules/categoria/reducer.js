import produce from 'immer';

const INITIAL_STATE = {
	ctg_categoria: null
};

export default function user(state = INITIAL_STATE, action) {
	return produce(state, (draft) => {});
}
