import React, { useEffect, useState } from 'react';
import { Table, Spinner, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiclient from '../../../Api/ApiClient';
import apis from '../../../Api/api.json';
import { TopHeader } from '../TopHeader/TopHeader';
import CmsDisplay from '../Header/CmsDisplay';
import { CmsFooter } from '../../components/Footer/CmsFooter';


export const EcrsubmissionList = () => {
    const [weeklyAccounts, setWeeklyAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch weekly account data
    const fetchEcrSubmissionList = async () => {
        try {
            debugger;
           const response = await apiclient.get('/api/ECRSubmission');
        
           if (response.status === 200) {
                setWeeklyAccounts(response.data);
            } else {
                toast.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching weekly accounts:', error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEcrSubmissionList();
    }, []);

   

    return (
        <>
            <TopHeader />
            <CmsDisplay />
            <div className="container mt-4">
                <h3>View Previous Records</h3>
                <div className="d-flex justify-content-end mb-3">
   
</div>

                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                ) : (
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>Sr.no</th>
                                <th>Entity Name</th>
                                <th>Beneficiary</th>
                                <th>Installed Capacity</th>
                                <th>PPA Quantum</th>
                                <th>PPA Rate</th>
                                <th>From date </th>
                                <th>To date</th>
                                <th>Approval Number</th>
                                <th>Copy of Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weeklyAccounts.length > 0 ? (
                                weeklyAccounts.map((account, index) => (
                                    <tr key={account.sno}>
                                        <td>{index + 1}</td>
                                        <td>{account.entityname}</td>
                                        <td>{account.beneficiary }</td>
                                        <td>{account.installedcapacity}</td>
                                        <td>{account.ppa_quantum}</td>
                                        <td>{account.ppa_rate}</td>
                                        <td>{account.fromdate}</td>
                                        <td>{account.todate}</td>
                                        <td>{account.approvalnumber}</td>
                                        <td>
                                            {account.copyofdata ? (
                                                <a  href={account.copyofdata.replace('/candidate', '')} target="_blank" rel="noopener noreferrer">
                                                    View Document
                                                </a>
                                            ) : (
                                                'No Document'
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="10" className="text-center">
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                )}
            </div>
            <CmsFooter />
            <ToastContainer />
        </>
    );
};
