import React from 'react';

interface Props {
  tableData: ChangeLog;
}

export const ChangeLogSubComponent = ({ tableData }: Props) => {
  return (
    <>{JSON.stringify(JSON.parse(tableData.delta), null, 2)}
    </>
  )
}