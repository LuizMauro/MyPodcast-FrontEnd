import styled from 'styled-components';

const List = styled.ul`
	max-width: 800px;
	margin: 0 auto;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20px;

	@media (max-width: 450px) {
		grid-template-columns: 1fr !important;
	}

	li {
		border-radius: 15px;
		background: #151734;
		border: 2px solid red;
	}

	.card_content {
		padding: 24px 24px 0 24px;
	}

	.card_info {
		padding: 12px 24px 24px 24px;
	}

	.card_info {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	p {
		margin-bottom: 0;
	}

	.description {
		display: grid;
		grid-template-rows: 1fr 1fr;
	}

	.button {
		background-color: #1bfdbe;
		border: none;
		filter: brightness(90%);
		padding: 5px 20px;
		border-radius: 20px;
	}

	@media (max-width: 1150.98px) {
		.card_info {
			grid-template-columns: none;
		}

		.description {
			margin-bottom: 10px;
		}
	}
`;

export default List;
