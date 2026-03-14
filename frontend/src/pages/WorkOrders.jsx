import React from 'react';
import { Briefcase, CheckCircle, Clock } from 'lucide-react';

const WorkOrders = () => {
  const orders = [
    { title: "Nagar Nigam Paint Procurement", client: "Municipal Corporation, Raipur", status: "Completed", icon: <CheckCircle className="text-primary" /> },
    { title: "Gaushala Plant Setup - Phase 1", client: "Animal Husbandry Dept, UP", status: "Completed", icon: <CheckCircle className="text-primary" /> },
    { title: "Turnkey Plant Installation - 500 LPD", client: "Rural Livelihood Mission, MP", status: "Ongoing", icon: <Clock className="text-muted" /> },
    { title: "Eco Paint Supply for Govt Schools", client: "Education Department, CG", status: "Ongoing", icon: <Clock className="text-muted" /> }
  ];

  return (
    <div className="work-orders-page section-padding">
      <div className="container">
        <div className="text-center mb-5 max-w-800 block-center">
          <Briefcase size={48} className="text-primary mb-4 block-center" />
          <h1 className="section-title">Work Orders</h1>
          <p className="section-subtitle">
            This page lists all ongoing and completed work orders executed by Namami Gaiya for government bodies and institutions.
          </p>
        </div>

        <div className="grid-2">
          {orders.map((order, idx) => (
            <div key={idx} className="glass-effect p-4 text-center" style={{ padding: '30px', borderRadius: '12px' }}>
              <div className="mb-4 flex-center">{order.icon}</div>
              <h3 className="mb-2">{order.title}</h3>
              <p className="text-muted mb-2">Client: {order.client}</p>
              <span className={`badge ${order.status === 'Completed' ? 'badge-success' : 'badge-warning'}`} style={{
                padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold',
                backgroundColor: order.status === 'Completed' ? '#e6f4ea' : '#fef0e6',
                color: order.status === 'Completed' ? '#1e7b34' : '#b25e02'
              }}>
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkOrders;
