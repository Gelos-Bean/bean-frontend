import ShowError from '../components/ShowError';
import { connection } from '../config/config.json';

export async function handleAddTable(tableNum, pax, limit) {

  if (!connection)
    return ShowError('Connection configuration is missing');
    
  try {
    const table = {
      tableNo: tableNum,
      pax: pax,
      limit: limit,
    };

    const response = await fetch(`${connection}/tables`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(table),
    });

    const data = await response.json();

    if (!data.success)
      return ShowError(data.msg || 'Failed to add table');

  } catch (err) {
    ShowError(err.message || 'Failed to connect to the server. Please check your network.');
  }
};