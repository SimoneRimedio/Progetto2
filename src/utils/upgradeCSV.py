import csv
from datetime import datetime, timedelta
from decimal import Decimal

def split_records(input_file, output_file):
    with open(input_file, 'r') as csvfile:
        reader = csv.DictReader(csvfile, delimiter=';')
        fieldnames = reader.fieldnames

        with open(output_file, 'w', newline='') as outfile:
            writer = csv.DictWriter(outfile, fieldnames=fieldnames, delimiter=';')
            writer.writeheader()

            for index, row in enumerate(reader, start=1):
                duration = row['DURATA']
                duration_hours, duration_minutes = map(int, duration.split('h'))
                total_duration_minutes = duration_hours * 60 + duration_minutes

                if total_duration_minutes >= 120:
                    # Splitting records and adding 55 minutes to each
                    num_splits = total_duration_minutes // 60
                    start_time = datetime.strptime(row['O.INIZIO'], "%Hh%M")
                    for i in range(num_splits):
                        new_row = row.copy()
                        unique_id = Decimal(f"{index}.{i+1}")
                        new_row['NUMERO'] = str(unique_id)
                        new_row['DURATA'] = '1h00'
                        new_start_time = start_time + timedelta(minutes=i * 55)
                        new_row['O.INIZIO'] = new_start_time.strftime("%Hh%M")
                        writer.writerow(new_row)
                else:
                    writer.writerow(row)

# Esegui lo script
input_file = './file.csv'
output_file = 'output.csv'
split_records(input_file, output_file)
print("Operazione completata!")
