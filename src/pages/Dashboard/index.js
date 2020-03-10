import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../../store/modules/auth/actions';

import api from '../../services/api';

// nodejs library that concatenates classes
//import classNames from "classnames";
// react plugin used to create charts

//import { Line, Pie } from "react-chartjs-2";

// reactstrap components
import { Card, CardBody, CardFooter, CardTitle, Row, Col } from 'reactstrap';

export default function Dashboard() {
	api.get('adm/users');

	const dispatch = useDispatch();

	function handleSignOut() {
		dispatch(signOut());
	}

	return (
		<>
			<div className="content p-20 m-10">
				<h1>ADM</h1>

				<Row className="p-50 m-50">
					<Col lg="3" md="6" sm="6">
						<Card className="card-stats .bg-dark">
							<CardBody>
								<Row>
									<Col md="4" xs="5">
										<div className="icon-big text-center icon-warning">
											<i className="nc-icon nc-globe text-warning" />
										</div>
									</Col>
									<Col md="8" xs="7">
										<div className="numbers">
											<p className="card-category">Capacity</p>
											<CardTitle tag="p">150GB</CardTitle>
											<p />
										</div>
									</Col>
								</Row>
							</CardBody>
							<CardFooter>
								<hr />
								<div className="stats">
									<i className="fas fa-sync-alt" /> Update Now
								</div>
							</CardFooter>
						</Card>
					</Col>
					<Col lg="3" md="6" sm="6">
						<Card className="card-stats .bg-dark">
							<CardBody>
								<Row>
									<Col md="4" xs="5">
										<div className="icon-big text-center icon-warning">
											<i className="nc-icon nc-globe text-warning" />
										</div>
									</Col>
									<Col md="8" xs="7">
										<div className="numbers">
											<p className="card-category">Capacity</p>
											<CardTitle tag="p">150GB</CardTitle>
											<p />
										</div>
									</Col>
								</Row>
							</CardBody>
							<CardFooter>
								<hr />
								<div className="stats">
									<i className="fas fa-sync-alt" /> Update Now
								</div>
							</CardFooter>
						</Card>
					</Col>
					<Col lg="3" md="6" sm="6">
						<Card className="card-stats .bg-dark">
							<CardBody>
								<Row>
									<Col md="4" xs="5">
										<div className="icon-big text-center icon-warning">
											<i className="nc-icon nc-globe text-warning" />
										</div>
									</Col>
									<Col md="8" xs="7">
										<div className="numbers">
											<p className="card-category">Capacity</p>
											<CardTitle tag="p">150GB</CardTitle>
											<p />
										</div>
									</Col>
								</Row>
							</CardBody>
							<CardFooter>
								<hr />
								<div className="stats">
									<i className="fas fa-sync-alt" /> Update Now
								</div>
							</CardFooter>
						</Card>
					</Col>
					<Col lg="3" md="6" sm="6">
						<Card className="card-stats .bg-dark">
							<CardBody>
								<Row>
									<Col md="4" xs="5">
										<div className="icon-big text-center icon-warning">
											<i className="nc-icon nc-globe text-warning" />
										</div>
									</Col>
									<Col md="8" xs="7">
										<div className="numbers">
											<p className="card-category">Capacity</p>
											<CardTitle tag="p">150GB</CardTitle>
											<p />
										</div>
									</Col>
								</Row>
							</CardBody>
							<CardFooter>
								<hr />
								<div className="stats">
									<i className="fas fa-sync-alt" /> Update Now
								</div>
							</CardFooter>
						</Card>
					</Col>
				</Row>

				<Row className="p-50 m-50">
					<Col lg="3" md="6" sm="6">
						<Card className="card-stats .bg-dark">
							<CardBody>
								<Row>
									<Col md="4" xs="5">
										<div className="icon-big text-center icon-warning">
											<i className="nc-icon nc-globe text-warning" />
										</div>
									</Col>
									<Col md="8" xs="7">
										<div className="numbers">
											<p className="card-category">Capacity</p>
											<CardTitle tag="p">150GB</CardTitle>
											<p />
										</div>
									</Col>
								</Row>
							</CardBody>
							<CardFooter>
								<hr />
								<div className="stats">
									<i className="fas fa-sync-alt" /> Update Now
								</div>
							</CardFooter>
						</Card>
					</Col>
					<Col lg="3" md="6" sm="6">
						<Card className="card-stats .bg-dark">
							<CardBody>
								<Row>
									<Col md="4" xs="5">
										<div className="icon-big text-center icon-warning">
											<i className="nc-icon nc-globe text-warning" />
										</div>
									</Col>
									<Col md="8" xs="7">
										<div className="numbers">
											<p className="card-category">Capacity</p>
											<CardTitle tag="p">150GB</CardTitle>
											<p />
										</div>
									</Col>
								</Row>
							</CardBody>
							<CardFooter>
								<hr />
								<div className="stats">
									<i className="fas fa-sync-alt" /> Update Now
								</div>
							</CardFooter>
						</Card>
					</Col>
					<Col lg="3" md="6" sm="6">
						<Card className="card-stats .bg-dark">
							<CardBody>
								<Row>
									<Col md="4" xs="5">
										<div className="icon-big text-center icon-warning">
											<i className="nc-icon nc-globe text-warning" />
										</div>
									</Col>
									<Col md="8" xs="7">
										<div className="numbers">
											<p className="card-category">Capacity</p>
											<CardTitle tag="p">150GB</CardTitle>
											<p />
										</div>
									</Col>
								</Row>
							</CardBody>
							<CardFooter>
								<hr />
								<div className="stats">
									<i className="fas fa-sync-alt" /> Update Now
								</div>
							</CardFooter>
						</Card>
					</Col>
					<Col lg="3" md="6" sm="6">
						<Card className="card-stats .bg-dark">
							<CardBody>
								<Row>
									<Col md="4" xs="5">
										<div className="icon-big text-center icon-warning">
											<i className="nc-icon nc-globe text-warning" />
										</div>
									</Col>
									<Col md="8" xs="7">
										<div className="numbers">
											<p className="card-category">Capacity</p>
											<CardTitle tag="p">150GB</CardTitle>
											<p />
										</div>
									</Col>
								</Row>
							</CardBody>
							<CardFooter>
								<hr />
								<div className="stats">
									<i className="fas fa-sync-alt" /> Update Now
								</div>
							</CardFooter>
						</Card>
					</Col>
				</Row>

				<Row>
					<button className="button" type="button" onClick={handleSignOut}>
						Sair
					</button>
				</Row>
			</div>
		</>
	);
}
