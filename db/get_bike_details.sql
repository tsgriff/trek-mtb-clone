select * from bikes
join features on features.id = bikes.id
where bikes.id = $1
