$(document).ready(function()
{
	try 
	{	
		$(".rotate").click(function() 
		{
  			$(".more").slideToggle("slow");
  			$(this).toggleClass("down"); 
  			
  			if ($(this).attr('aria-expanded') == 'false') 
  			{
  				$(this).attr('aria-expanded', 'true');
  				(this).focus();
  			}
  			else { 
  				$(this).attr('aria-expanded', 'false');
  			}	
		});    
	}
	catch (e) {}
});