import os
from datetime import datetime
from collections import defaultdict
import pandas as pd
import numpy as np

input_dir = 'assets/images/cancer/chemo-pills'

dates = defaultdict(list)

# Parse filenames
for fname in os.listdir(input_dir):
    if fname.endswith('.jpg'):

        # Remove extension and split
        name = os.path.splitext(fname)[0]  # e.g., IMG_20250112_080012
        
        _, date_str, time_str = name.split("_")  # e.g., "20250112", "080012"
        dt = datetime.strptime(date_str + time_str, "%Y%m%d%H%M%S")
        dates[date_str].append(dt)

records = []

# Calculate differences
for date, times in dates.items():
    if len(times) == 2:
        morning, evening = sorted(times)
        diff = evening - morning
        hours, minutes, seconds = map(int, str(diff).split(':'))
        records.append({
            'day': date,
            'morning': morning.time(),
            'evening': evening.time(),
            'difference': str(diff),
            'difference_hours': hours + (minutes / 60) + (seconds / 3600)
        })

df = pd.DataFrame(records)
df.to_csv('data/chemopills-hours.csv', index=False)

counts, bin_edges = np.histogram(df['difference_hours'], bins=20)

# Format result
histogram_df = pd.DataFrame({
    'bucket': bin_edges[:-1],
    'frequency': counts
})

histogram_df.to_csv('data/chemopills-hours-hist.csv', index=False)


   
        