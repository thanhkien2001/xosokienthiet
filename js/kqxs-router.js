/**
 * Dynamic KQXS Router
 * Handles date-based routing for lottery results pages
 */

(function() {
    'use strict';
    
    // Immediate log to confirm script is loading
    console.log('[KQXS Router] ========== SCRIPT STARTING ==========');
    console.log('[KQXS Router] Script file loaded at:', new Date().toISOString());

    // Extract date from URL pattern: /kqxs-dd-mm-yyyy.html or ?date=dd-mm-yyyy
    function getDateFromUrl() {
        var path = window.location.pathname;
        var search = window.location.search;
        var dateMatch;
        
        // Try to get from URL path: /kqxs-10-12-2025.html
        dateMatch = path.match(/kqxs-(\d{2})-(\d{2})-(\d{4})\.html/);
        if (dateMatch) {
            return {
                day: parseInt(dateMatch[1]),
                month: parseInt(dateMatch[2]),
                year: parseInt(dateMatch[3]),
                formatted: dateMatch[1] + '/' + dateMatch[2] + '/' + dateMatch[3],
                formattedDash: dateMatch[1] + '-' + dateMatch[2] + '-' + dateMatch[3]
            };
        }
        
        // Try to get from query parameter: ?date=10-12-2025
        var params = new URLSearchParams(search);
        var dateParam = params.get('date');
        if (dateParam) {
            var parts = dateParam.split('-');
            if (parts.length === 3) {
                return {
                    day: parseInt(parts[0]),
                    month: parseInt(parts[1]),
                    year: parseInt(parts[2]),
                    formatted: parts[0] + '/' + parts[1] + '/' + parts[2],
                    formattedDash: dateParam
                };
            }
        }
        
        // Default to today
        var today = new Date();
        return {
            day: today.getDate(),
            month: today.getMonth() + 1,
            year: today.getFullYear(),
            formatted: String(today.getDate()).padStart(2, '0') + '/' + 
                      String(today.getMonth() + 1).padStart(2, '0') + '/' + 
                      today.getFullYear(),
            formattedDash: String(today.getDate()).padStart(2, '0') + '-' + 
                          String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                          today.getFullYear()
        };
    }

    // Get day of week name in Vietnamese
    function getDayOfWeekName(date) {
        var days = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
        var d = new Date(date.year, date.month - 1, date.day);
        return days[d.getDay()];
    }

    // Load lottery results data for a specific date
    function loadLotteryResults(date) {
        console.log('[KQXS Router] Loading lottery results for date:', date.formattedDash);
        
        // Show loading indicator
        var loadingMsg = document.createElement('div');
        loadingMsg.id = 'kqxs-loading';
        loadingMsg.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;padding:20px;border:2px solid #ed1c25;border-radius:5px;z-index:9999;';
        loadingMsg.innerHTML = '<p>Đang tải kết quả xổ số ngày ' + date.formatted + '...</p>';
        document.body.appendChild(loadingMsg);
        
        // Try multiple methods to load data
        
        // Method 1: Try to fetch the HTML page for that date
        var htmlUrl = '/kqxs-' + date.formattedDash + '.html';
        
        fetch(htmlUrl)
            .then(function(response) {
                if (response.ok) {
                    return response.text();
                }
                throw new Error('HTML file not found');
            })
            .then(function(html) {
                console.log('[KQXS Router] Fetched HTML, extracting lottery data...');
                // Create a temporary DOM to parse the HTML
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, 'text/html');
                
                // Extract lottery results from the fetched HTML
                updateLotteryNumbersFromHTML(doc, date);
                
                // Remove loading indicator
                var loading = document.getElementById('kqxs-loading');
                if (loading) loading.remove();
            })
            .catch(function(error) {
                console.log('[KQXS Router] HTML file not found, trying API...');
                
                // Method 2: Try API endpoint (if available)
                // You would need to provide the actual API endpoint here
                // Example: var apiUrl = '/api/kqxs?date=' + date.formattedDash;
                
                // For now, show error message
                var loading = document.getElementById('kqxs-loading');
                if (loading) loading.remove();
                
                alert('Không tìm thấy kết quả xổ số cho ngày ' + date.formatted + '.\n\n' +
                      'Vui lòng:\n' +
                      '1. Đảm bảo file kqxs-' + date.formattedDash + '.html tồn tại, hoặc\n' +
                      '2. Cung cấp API endpoint để load dữ liệu.');
            });
    }
    
    // Extract and update lottery numbers from fetched HTML
    function updateLotteryNumbersFromHTML(sourceDoc, date) {
        console.log('[KQXS Router] Updating lottery numbers from HTML...');
        
        // List of prize element IDs to update
        var prizeSelectors = [
            // Miền Bắc
            { prefix: 'mb_prize', region: 'MB' },
            // Miền Nam  
            { prefix: 'mn_prize', region: 'MN' },
            // Miền Trung
            { prefix: 'mt_prize', region: 'MT' }
        ];
        
        prizeSelectors.forEach(function(selector) {
            // Find all elements with this prefix in source
            var sourceElements = sourceDoc.querySelectorAll('[id^="' + selector.prefix + '"]');
            sourceElements.forEach(function(sourceEl) {
                var id = sourceEl.id;
                var targetEl = document.getElementById(id);
                if (targetEl) {
                    targetEl.innerHTML = sourceEl.innerHTML;
                    console.log('[KQXS Router] Updated:', id);
                }
            });
        });
        
        console.log('[KQXS Router] Lottery numbers updated successfully');
    }

    // Update all date-related content on the page
    function updatePageContent(date) {
        var dayOfWeek = getDayOfWeekName(date);
        
        console.log('[KQXS Router] Updating page content for date:', date.formatted);
        
        // Update title
        var title = 'KQXS 3 miền ' + date.formatted + ', Kết quả Xổ số ngày ' + date.formatted;
        document.title = title;
        
        // Update meta tags
        var metaTitle = document.querySelector('meta[property="twitter:title"]');
        if (metaTitle) metaTitle.setAttribute('content', title);
        
        var metaDC = document.querySelector('meta[name="DC.title"]');
        if (metaDC) metaDC.setAttribute('content', title);
        
        var metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            metaDesc.setAttribute('content', 'KQXS 3 miền MB MT MN ' + date.formatted + 
                ', Kết quả Xổ số các tỉnh mở thưởng ngày ' + date.formatted + 
                '. Tường thuật kết quả Xổ số từ trường quay nhanh, chính xác nhất');
        }
        
        var metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) {
            metaKeywords.setAttribute('content', 'kqxs ' + date.formatted + ',kqxs,kq xs ' + date.formatted);
        }
        
        var canonical = document.querySelector('link[rel="canonical"]');
        if (canonical) {
            canonical.setAttribute('href', 'https://xoso.com.vn/kqxs-' + date.formattedDash + '.html');
        }
        
        // Update breadcrumb
        var breadcrumb = document.querySelector('.breadcrumb span');
        if (breadcrumb) {
            breadcrumb.textContent = 'KQXS ngày ' + date.formatted;
        }
        
        // Update H1
        var h1 = document.querySelector('h1');
        if (h1) {
            h1.textContent = 'KQXS ' + date.formatted + ' - Kết quả Xổ số ngày ' + date.formatted;
        }
        
        // Update all date references in links and text
        // This will be done by walking through the DOM
        function replaceTextInNode(node) {
            if (node.nodeType === 3) { // Text node
                var text = node.textContent;
                var originalText = text;
                
                // Replace date patterns (this is a fallback, most updates are done above)
                // The main updates are done via specific selectors above
                if (text.includes('10/12/2025') || text.includes('10-12-2025')) {
                    text = text.replace(/10\/12\/2025/g, date.formatted);
                    text = text.replace(/10-12-2025/g, date.formattedDash);
                    if (text !== originalText) {
                        node.textContent = text;
                    }
                }
            } else if (node.nodeType === 1) { // Element node
                // Skip script and style tags
                if (node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE') {
                    for (var i = 0; i < node.childNodes.length; i++) {
                        replaceTextInNode(node.childNodes[i]);
                    }
                }
            }
        }
        
        // Walk through body to update any remaining date references
        if (document.body) {
            replaceTextInNode(document.body);
        }
        
        // Update href attributes in links
        var links = document.querySelectorAll('a[href*="10-12-2025"], a[href*="10/12/2025"]');
        links.forEach(function(link) {
            var href = link.getAttribute('href');
            if (href) {
                href = href.replace(/10-12-2025/g, date.formattedDash);
                href = href.replace(/10\/12\/2025/g, date.formatted.replace(/\//g, '-'));
                link.setAttribute('href', href);
            }
        });
        
        // Update title attributes
        var titles = document.querySelectorAll('[title*="10-12-2025"], [title*="10/12/2025"]');
        titles.forEach(function(el) {
            var title = el.getAttribute('title');
            if (title) {
                title = title.replace(/10-12-2025/g, date.formattedDash);
                title = title.replace(/10\/12\/2025/g, date.formatted);
                el.setAttribute('title', title);
            }
        });
        
        // Update structured data (JSON-LD)
        var jsonLd = document.querySelector('script[type="application/ld+json"]');
        if (jsonLd) {
            try {
                var data = JSON.parse(jsonLd.textContent);
                if (data['@type'] === 'WebPage') {
                    data.name = title;
                    data.description = metaDesc ? metaDesc.getAttribute('content') : '';
                    data.url = 'https://xoso.com.vn/kqxs-' + date.formattedDash + '.html';
                    data['@id'] = 'https://xoso.com.vn/#kqxs-' + date.formattedDash;
                    if (data.keywords) {
                        data.keywords = ['kqxs ' + date.formatted, ' kqxs', ' kq xs ' + date.formatted];
                    }
                    data.datePublished = date.year + '-' + 
                        String(date.month).padStart(2, '0') + '-' + 
                        String(date.day).padStart(2, '0') + 'T00:00:00+07:00';
                    jsonLd.textContent = JSON.stringify(data);
                }
            } catch (e) {
                console.error('Error updating JSON-LD:', e);
            }
        }
    }

    // Override calendar navigation to use dynamic routing
    // This must run AFTER calendar script loads but BEFORE CreateCalendarUC() is called
    function overrideCalendarNavigation() {
        console.log('[KQXS Router] overrideCalendarNavigation called');
        
        // Wait for calendar script to load (CreateCalendarUC and helper functions)
        var checkCount = 0;
        var checkInterval = setInterval(function() {
            checkCount++;
            console.log('[KQXS Router] Checking for CreateCalendarUC, attempt:', checkCount);
            
            // Check if CreateCalendarUC exists
            if (typeof window.CreateCalendarUC !== 'undefined') {
                console.log('[KQXS Router] CreateCalendarUC found! Setting up override...');
                clearInterval(checkInterval);
                setupCalendarOverride();
            } else if (checkCount > 100) { // Stop after 10 seconds
                clearInterval(checkInterval);
                console.error('[KQXS Router] Calendar script not loaded after 10 seconds, override may not work');
            }
        }, 100);
    }
    
    // Try to override immediately if script already loaded
    if (typeof window.CreateCalendarUC !== 'undefined') {
        console.log('[KQXS Router] CreateCalendarUC already exists, setting up override...');
        setTimeout(setupCalendarOverride, 100); // Small delay to ensure all vars are ready
    } else {
        console.log('[KQXS Router] CreateCalendarUC not found yet, will wait...');
    }
    
    function setupCalendarOverride() {
        console.log('[KQXS Router] setupCalendarOverride called');
        
        // Wait for jQuery and calendar script to be available
        if (typeof jQuery === 'undefined') {
            console.log('[KQXS Router] jQuery not ready, retrying...');
            setTimeout(setupCalendarOverride, 50);
            return;
        }
        
        if (typeof window.CreateCalendarUC === 'undefined') {
            console.log('[KQXS Router] CreateCalendarUC not ready, retrying...');
            setTimeout(setupCalendarOverride, 50);
            return;
        }
        
        console.log('[KQXS Router] All dependencies ready, overriding CreateCalendarUC...');
        
        var $ = jQuery;
        
        // Store original function
        var originalCreateCalendar = window.CreateCalendarUC;
        console.log('[KQXS Router] Original CreateCalendarUC stored:', typeof originalCreateCalendar);
        
        // Get global variables from calendar script (they should be in global scope)
        // These are defined in calendar.min.js
        var GetFullString = typeof GetFullString !== 'undefined' ? GetFullString : 
                           (typeof window.GetFullString !== 'undefined' ? window.GetFullString : 
                           function(n) {
                               return n < 10 ? "0" + n.toString() : n.toString();
                           });
        var split_1 = typeof split_1 !== 'undefined' ? split_1 : 
                     (typeof window.split_1 !== 'undefined' ? window.split_1 : "-");
        var CookieName = typeof CookieName !== 'undefined' ? CookieName : 
                        (typeof window.CookieName !== 'undefined' ? window.CookieName : "SelectedDate");
        
        console.log('[KQXS Router] Helper vars - GetFullString:', typeof GetFullString, 'split_1:', split_1, 'CookieName:', CookieName);
        
        // Override CreateCalendarUC - completely replace it
        window.CreateCalendarUC = function() {
            console.log('[KQXS Router] ========== Overridden CreateCalendarUC called! ==========');
            
            // Declare variables first (they are used as globals in original script)
            var $calendar, cal, $month, $year;
            
            // Recreate the entire function with modified navigation logic
            function n() {
                $month = $("#custom-month").val(cal.getMonthName());
                $year = $("#custom-year").val(cal.getYear());
            }
            
            // Modified navigation function - uses dynamic routing
            function t(n, t, i) {
                console.log('[KQXS Router] Navigation function t() called with:', i);
                
                var r = new Date;
                var dayStr = GetFullString(i.day) == "" ? r.getDate() : GetFullString(i.day);
                var monthStr = GetFullString(i.month) == "" ? (r.getMonth() + 1) : GetFullString(i.month);
                var u = dayStr + split_1 + monthStr + split_1 + i.year.toString();
                var o = i.year.toString() + split_1 + GetFullString(i.month) + split_1 + GetFullString(i.day);
                var f = true;
                
                // Check if date is in future
                if (i.year > r.getFullYear()) f = false;
                else if (i.year == r.getFullYear() && i.month > r.getMonth() + 1) f = false;
                else if (i.year == r.getFullYear() && i.month == r.getMonth() + 1 && i.day > r.getDate()) f = false;
                
                if (f == false) {
                    console.log('[KQXS Router] Date is in future, showing alert');
                    alert("Xổ số ngày " + u + " chưa mở thưởng");
                } else {
                    // Save cookie
                    if ($.cookie) {
                        $.cookie(CookieName, o, {
                            expires: 7,
                            path: "/"
                        });
                    }
                    
                    // MODIFIED: Use dynamic routing instead of hardcoded files
                    var dateFormatted = dayStr + '-' + monthStr + '-' + i.year.toString();
                    console.log('[KQXS Router] Navigating to dynamic page:', '/kqxs.html?date=' + dateFormatted);
                    window.location.href = '/kqxs.html?date=' + dateFormatted;
                }
            }
            
            $calendar = $("#calendar");
            console.log('[KQXS Router] Creating calendar with overridden onDayClick');
            cal = $calendar.calendario({
                onDayClick: function(n, i, r) {
                    console.log('[KQXS Router] onDayClick called!', i);
                    t(n, i, r);
                },
                caldata: null,
                displayWeekAbbr: true
            });
            console.log('[KQXS Router] Calendar created successfully');
            
            $month = $("#custom-month").val(cal.getMonthName());
            $year = $("#custom-year").val(cal.getYear());
            
            // Mark override as ready
            window.kqxsRouterOverrideReady = true;
            console.log('[KQXS Router] ========== Override setup complete! ==========');
            
            $("#custom-next").on("click", function() {
                cal.gotoNextMonth(n);
            });
            
            $("#custom-prev").on("click", function() {
                cal.gotoPreviousMonth(n);
            });
            
            $("#custom-current").on("click", function() {
                cal.gotoNow(n);
            });
            
            $("#custom-month").on("change", function() {
                var t = parseInt($("#custom-month").val()) - 1;
                var i = parseInt($("#custom-year").val());
                cal.goto(t, i, n);
            });
            
            $("#custom-year").on("change", function() {
                var t = parseInt($("#custom-month").val()) - 1;
                var i = parseInt($("#custom-year").val());
                cal.goto(t, i, n);
            });
        };
    }

    // Handle URL redirects for old pattern: /kqxs-dd-mm-yyyy.html -> /kqxs.html?date=dd-mm-yyyy
    function handleUrlRedirect() {
        var path = window.location.pathname;
        var dateMatch = path.match(/kqxs-(\d{2})-(\d{2})-(\d{4})\.html/);
        
        if (dateMatch && !window.location.search) {
            // Redirect to new format with query parameter
            var dateFormatted = dateMatch[1] + '-' + dateMatch[2] + '-' + dateMatch[3];
            window.location.replace('/kqxs.html?date=' + dateFormatted);
            return true;
        }
        return false;
    }

    // Intercept window.location assignments to catch calendar navigation
    function interceptLocationAssignments() {
        console.log('[KQXS Router] interceptLocationAssignments called');
        try {
            // Try to intercept window.location.href setter
            var originalLocation = window.location;
            var locationDescriptor = Object.getOwnPropertyDescriptor(window, 'location') ||
                                   Object.getOwnPropertyDescriptor(Object.getPrototypeOf(window), 'location');
            
            if (locationDescriptor && locationDescriptor.configurable) {
                console.log('[KQXS Router] Intercepting window.location setter');
                Object.defineProperty(window, 'location', {
                    get: function() {
                        return originalLocation;
                    },
                    set: function(url) {
                        console.log('[KQXS Router] window.location setter called with:', url);
                        if (typeof url === 'string') {
                            var match = url.match(/kqxs-(\d{2})-(\d{2})-(\d{4})\.html/);
                            if (match) {
                                var dateFormatted = match[1] + '-' + match[2] + '-' + match[3];
                                console.log('[KQXS Router] Intercepted kqxs URL, redirecting to:', '/kqxs.html?date=' + dateFormatted);
                                originalLocation.replace('/kqxs.html?date=' + dateFormatted);
                                return;
                            }
                        }
                        console.log('[KQXS Router] Not a kqxs URL, using original behavior');
                        originalLocation.href = url;
                    },
                    configurable: true
                });
            } else {
                console.log('[KQXS Router] window.location is not configurable');
            }
            
            // Also try to intercept location.href setter
            var hrefDescriptor = Object.getOwnPropertyDescriptor(Location.prototype, 'href') ||
                                Object.getOwnPropertyDescriptor(Object.getPrototypeOf(originalLocation), 'href');
            
            if (hrefDescriptor && hrefDescriptor.set) {
                console.log('[KQXS Router] Intercepting Location.prototype.href setter');
                var originalHrefSetter = hrefDescriptor.set;
                Object.defineProperty(Location.prototype, 'href', {
                    get: hrefDescriptor.get,
                    set: function(url) {
                        console.log('[KQXS Router] location.href setter called with:', url);
                        if (typeof url === 'string') {
                            var match = url.match(/kqxs-(\d{2})-(\d{2})-(\d{4})\.html/);
                            if (match) {
                                var dateFormatted = match[1] + '-' + match[2] + '-' + match[3];
                                console.log('[KQXS Router] Intercepted kqxs URL in href setter, redirecting to:', '/kqxs.html?date=' + dateFormatted);
                                originalLocation.replace('/kqxs.html?date=' + dateFormatted);
                                return;
                            }
                        }
                        console.log('[KQXS Router] Not a kqxs URL in href setter, using original behavior');
                        originalHrefSetter.call(this, url);
                    },
                    configurable: true
                });
            } else {
                console.log('[KQXS Router] Location.prototype.href is not configurable');
            }
        } catch (e) {
            // Location interception may not work in all browsers
            console.error('[KQXS Router] Location interception error:', e);
        }
    }

    // Watch for calendar initialization using MutationObserver
    function watchForCalendar() {
        if (typeof MutationObserver === 'undefined') return;
        
        var observer = new MutationObserver(function(mutations) {
            var $calendar = typeof jQuery !== 'undefined' ? jQuery('#calendar') : null;
            if ($calendar && $calendar.length && $calendar.find('ul.caleandar-days').length) {
                // Calendar is rendered, try to override
                setTimeout(function() {
                    setupCalendarClickHandler();
                }, 100);
                observer.disconnect();
            }
        });
        
        // Start observing
        var calendarContainer = document.getElementById('calendar');
        if (calendarContainer) {
            observer.observe(calendarContainer, {
                childList: true,
                subtree: true
            });
        }
    }
    
    // Setup click handler directly on calendar (backup method)
    // This uses capture phase to intercept clicks BEFORE calendar handler
    var calendarClickHandler = null;
    
    function setupCalendarClickHandler() {
        if (typeof jQuery === 'undefined') return;
        var $ = jQuery;
        
        var $calendar = $('#calendar');
        if (!$calendar.length) return;
        
        var calendarEl = $calendar[0];
        if (!calendarEl) return;
        
        // Remove old handler if exists
        if (calendarClickHandler) {
            calendarEl.removeEventListener('click', calendarClickHandler, true);
        }
        
        // Create new handler
        calendarClickHandler = function(e) {
            var target = e.target;
            var $target = $(target);
            var $li = $target.closest('ul.caleandar-days > li');
            
            if ($li.length) {
                // Stop ALL propagation immediately
                e.stopImmediatePropagation();
                e.stopPropagation();
                e.preventDefault();
                
                var $span = $li.children('span');
                var $dateSpan = $span.children('span.fc-date');
                
                if ($dateSpan.length) {
                    var day = parseInt($dateSpan.text().trim());
                    if (isNaN(day) || day === 0) return false;
                    
                    var monthSelect = $('#custom-month');
                    var yearSelect = $('#custom-year');
                    
                    if (monthSelect.length && yearSelect.length) {
                        var month = parseInt(monthSelect.val());
                        var year = parseInt(yearSelect.val());
                        
                        var today = new Date();
                        today.setHours(0, 0, 0, 0);
                        var selectedDate = new Date(year, month - 1, day);
                        selectedDate.setHours(0, 0, 0, 0);
                        
                        if (selectedDate > today) {
                            var dateStr = (day < 10 ? '0' : '') + day + '/' + 
                                         (month < 10 ? '0' : '') + month + '/' + year;
                            alert("Xổ số ngày " + dateStr + " chưa mở thưởng");
                            return false;
                        }
                        
                        var dateFormatted = (day < 10 ? '0' : '') + day + '-' + 
                                           (month < 10 ? '0' : '') + month + '-' + 
                                           year;
                        
                        window.location.href = '/kqxs.html?date=' + dateFormatted;
                        return false;
                    }
                }
            }
        };
        
        // Add with capture phase (runs BEFORE other handlers)
        calendarEl.addEventListener('click', calendarClickHandler, true);
    }

    // Initialize when DOM is ready
    function init() {
        console.log('[KQXS Router] init() called');
        console.log('[KQXS Router] Current URL:', window.location.href);
        console.log('[KQXS Router] CreateCalendarUC exists?', typeof window.CreateCalendarUC !== 'undefined');
        
        // Intercept location assignments FIRST (before calendar loads)
        interceptLocationAssignments();
        console.log('[KQXS Router] Location interception setup');
        
        // Handle URL redirect first
        if (handleUrlRedirect()) {
            console.log('[KQXS Router] URL redirect triggered');
            return; // Will redirect, so don't continue
        }
        
        // Only update content if we're on a kqxs page
        if (window.location.pathname.includes('kqxs')) {
            console.log('[KQXS Router] On kqxs page, updating content');
            var date = getDateFromUrl();
            console.log('[KQXS Router] Date from URL:', date);
            updatePageContent(date);
            
            // Load lottery results data for this date
            // Always try to load (even for default date, in case data needs refresh)
            loadLotteryResults(date);
        }
        
        // Override calendar navigation on all pages that have calendar
        // This must run BEFORE calendar script executes
        console.log('[KQXS Router] Setting up calendar override...');
        overrideCalendarNavigation();
        
        // Also watch for calendar rendering as backup
        watchForCalendar();
    }

    // Start overriding calendar immediately (before calendar script loads)
    overrideCalendarNavigation();
    
    // Log script loading
    console.log('[KQXS Router] Script loaded');
    console.log('[KQXS Router] Document ready state:', document.readyState);
    console.log('[KQXS Router] CreateCalendarUC exists?', typeof window.CreateCalendarUC !== 'undefined');
    
    // Intercept location assignments IMMEDIATELY (before anything else)
    interceptLocationAssignments();
    console.log('[KQXS Router] Location interception initialized');
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
        console.log('[KQXS Router] Waiting for DOMContentLoaded...');
        document.addEventListener('DOMContentLoaded', init);
    } else {
        console.log('[KQXS Router] DOM already ready, calling init()');
        init();
    }

})();
