import React, { useMemo } from 'react';
import Formatting from '../../Helpers/Functions/Formatting';

function conditionPropertyLabel(prop: string): string {
  const label = prop.replace('_Id', '').replace('_', '').replace('ID', 'Id');
  return Formatting.splitCamelCase(label);
}

function getChangeLogText(updatedThings: Array<string>, newThings: Array<string>, deletedThings: Array<string>) {
  let text = '';
  if (newThings.length) {
    text = `Added ${newThings.join(', ')}`;
  }
  if (deletedThings.length) {
    text += text.length ? ', and deleted ' : 'Deleted ';
    text += deletedThings.join(', ');
  }
  if (updatedThings.length) {
    text += text.length ? ', and updated ' : 'Updated ';
    text += updatedThings.join(', ');
  }
  return text;
}

interface Props {
  delta: string;
}

function parseUpdates(delta: any) {
  const updatedThings = [];
  const newThings = [];
  const deletedThings = [];

  for (const [key, value] of Object.entries(delta)) {
    const friendlyKey = conditionPropertyLabel(key);
    const anyValue = value as any;
    if (anyValue.oldValues || anyValue.newValues) {
      updatedThings.push(friendlyKey);
    } else if (anyValue.oldValue === null) {
      newThings.push(friendlyKey);
    } else if (anyValue.newValue === null) {
      deletedThings.push(friendlyKey);
    } else {
      updatedThings.push(friendlyKey);
    }
  }
  return [updatedThings, newThings, deletedThings];
}

function ChangeLogCell({ delta }: Props) {

  const parsedDelta = JSON.parse(delta);

  const [updatedThings, newThings, deletedThings] = useMemo(() => parseUpdates(parsedDelta), [parsedDelta]);

  return (
    <>
      {getChangeLogText(updatedThings, newThings, deletedThings)}
    </>
  )
}

export default ChangeLogCell;
