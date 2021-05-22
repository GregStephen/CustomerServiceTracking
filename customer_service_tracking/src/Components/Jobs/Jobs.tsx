import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';
import { GlobalTable } from '../Global';
import { JobNotesModal, EditJobModal } from '../Modals';
import Formatting from '../../Helpers/Functions/Formatting';
import { useDeleteJob, useEditJob } from '../../Helpers/Data/JobRequests';
import useGetJobTypeOptions from '../../Helpers/Data/JobTypeRequests';

interface Props {
  jobs: Business.Job[];
}
function Jobs({ jobs }: Props) {
  const jobTypeOptions = useGetJobTypeOptions();
  const deleteJob = useDeleteJob();
  const editTheJob = useEditJob();

  const tableData = useMemo(() => (jobs ?? []), [jobs]);

  const tableColumns: Column<Business.Job>[] = useMemo(() => [
    {
      Header: 'All Assigned Jobs',
      className: 'top-header',
      columns: [
        {
          Header: 'Property',
          accessor: 'propertySystemId',
          Cell: ({ row: { original } }) => (
            <Link to={{ pathname: `/property/${original.property?.id}` }}>{`${original.property?.displayName}`}</Link>
          ),
        },
        {
          Header: 'Address',
          accessor: 'property',
          Cell: ({ row: { original } }) => (
            <a rel="noopener noreferrer" target="_blank" href={original.property ? Formatting.directionLink(original.property) : ''}>{original.property?.addressLine1}</a>
          ),
        },
        {
          Header: 'System',
          accessor: (j) => j?.propertySystem?.displayName,
          Cell: ({ row: { original } }: any ) => (
            <Link to={{ pathname: `/property/${original.property?.id}/system/${original.propertySystem?.id}` }}>{original.propertySystem.displayName}</Link>
          ),
        },
        {
          Header: 'Job Type',
          accessor: 'jobType',
        },
        {
          Header: 'Notes',
          accessor: 'note',
          Cell: ({ value }) => (value ? <JobNotesModal note={value} /> : 'No Notes'),
        },
        {
          Header: 'Tech Assigned',
          accessor: 'technicianName',
          Cell: ({ value }) => (value),
        },
        {
          Header: ' ',
          accessor: 'id',
          Cell: ({ row: { original } }) => (
            jobTypeOptions?.data ?
              <EditJobModal
                job={original}
                editJob={editTheJob}
                deleteJob={deleteJob}
                jobTypeOptions={jobTypeOptions?.data}
              /> : ''
          ),
        },
      ],
    },
  ], [editTheJob, deleteJob, jobTypeOptions]);

  return (
    <GlobalTable
      columns={tableColumns}
      data={tableData}
      emptyTableMessage="No jobs currently assigned"
    />
  );
}

export default Jobs;
