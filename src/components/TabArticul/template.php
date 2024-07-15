<? if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die(); ?>

<li class="search__byOEM">
	<div class="search_label">По артикулу</div>
	<div class="search_tabs">
		<div id="search__tabs__container" class="search__tabs__container">
			<form>
				<div style="width: 100%; position: relative;">
					<input id="searchByNumberId" type="text" name="q" value="" size="40" maxlength="20" autocomplete="off" class="form-control search_input" placeholder="Артикул (больше 2 символов)" />
					<div class="search_loader-anime" style="position: absolute;">
						<img src="/local/templates/bpauto/images/loadergif.gif" alt="loader" />
					</div>
				</div>
			</form>
			<div class="title-search-result-container">
				<div class="title-search-result" id="searchByNumberId_result"></div>
			</div>
			<div class="title-search-fader"></div>
			<div class="empty-result" id="searchByNumberId_error">
				По вашему запросу ничего не найдено.
			</div>
		</div>
	</div>
</li>