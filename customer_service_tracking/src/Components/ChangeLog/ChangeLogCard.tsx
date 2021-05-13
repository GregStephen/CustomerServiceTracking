import React, { useMemo, useState } from 'react';
import { Button, Card, CardSubtitle, Collapse } from 'reactstrap';
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

function ChangeLogCard({ delta }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const parsedDelta = JSON.parse(delta);

  const [updatedThings, newThings, deletedThings] = useMemo(() => parseUpdates(parsedDelta), [parsedDelta]);

  return (<Card className="mb-3 shardow-sm bg-gray-50" body>
    <CardSubtitle>
      {getChangeLogText(updatedThings, newThings, deletedThings)}
      <Button
        color="light"
        onClick={() => setIsOpen(!isOpen)}>
        Advanced Details
      </Button>
    </CardSubtitle>
    <Collapse isOpen={isOpen} className="pt-2">
      <pre className="text-muted">
        {'Advanced Details: '}
        {JSON.stringify(parsedDelta, null, 2)}
      </pre>
    </Collapse>
  </Card>);
}

export default ChangeLogCard;
