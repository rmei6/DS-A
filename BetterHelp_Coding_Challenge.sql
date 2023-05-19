SELECT People.Name, MAX(Donation_Date) 'Most Recent Donation', 
Case WHEN SUM(d.party) < 0 THEN 'Democrat'
WHEN SUM(d.Party) > 0 THEN 'Republican'
ELSE 'Undetermined'
END AS 'Political Party', People.Address
FROM People LEFT JOIN Donations on People.ID = Donations.People_ID
GROUP BY People.Name, People.Address

/* Command to make submit button work */
$('button').off('click').click(() => {
  $.ajax('ajax.php', {
    type: ‘POST’,
    data: { submission: JSON.stringify({ prop: document.getElementsByName('sql_submission')[0].value }) },
    success: success_callback
  });
});