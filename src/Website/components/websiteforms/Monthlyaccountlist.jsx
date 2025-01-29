import React, { useEffect, useState } from 'react';
import { Table, Spinner, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiclient from '../../../Api/ApiClient';
import apis from '../../../Api/api.json';
import { TopHeader } from '../TopHeader/TopHeader';
import CmsDisplay from '../Header/CmsDisplay';
import { CmsFooter } from '../../components/Footer/CmsFooter';

export const Monthlyaccountlist = () => {
    const [weeklyAccounts, setWeeklyAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch weekly account data
    const fetchWeeklyAccounts = async () => {
        try {
            const response = await apiclient.get('/api/Monthlyaccount/getlist');
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
        fetchWeeklyAccounts();
    }, []);

    const handleAddNewRecord = () => {
        toast.info("Redirecting to add new record page...");
        // Example: Redirect to form page
        window.location.href = '/candidate/Monthlyaccount';
    };

    return (
        <>
            <TopHeader />
            <CmsDisplay />
            <div className="container mt-4">
                <h3>Monthly  Account List</h3>
                <div className="d-flex justify-content-end mb-3">
    <Button 
        variant="primary" 
        style={{ backgroundColor: '#007bff',color:'white', borderColor: '#007bff' }} 
        onClick={handleAddNewRecord}
    >
        + Add New Record
    </Button>
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
                                <th>Name of the Pool member/Entity</th>
                                <th>Monthly Account</th>
                                <th>Discrepancy Month</th>
                                <th>Discepancy Date </th>
                                <th>Summary sheet/Type of Transaction if any for REA</th>
                                <th>Discrepancy/Reason</th>
                                <th>Resolved/ Not resolved</th>
                                <th>Reasons if any</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weeklyAccounts.length > 0 ? (
                                weeklyAccounts.map((account, index) => (
                                    <tr key={account.sno}>
                                        <td>{index + 1}</td>
                                        <td>{account.poolmember}</td>
                                        <td>{account.monthly_account}</td>
                                        <td>{account.discrepancymonth}</td>
                                        <td>{account.discrepancydate}</td>
                                        <td>{account.summarysheet}</td>
                                        <td>{account.discrepancyreason}</td>
                                        <td>{account.remark}</td>
                                        <td>{account.reason}</td>
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
